#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function runCommand(command, options = {}) {
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return result;
  } catch (error) {
    console.error(`Failed to run: ${command}`);
    throw error;
  }
}

function getCurrentVersion() {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
  return pkg.version;
}

function updateVersion(newVersion) {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
  pkg.version = newVersion;
  writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
}

function getNextVersion(current, type) {
  const parts = current.split('.').map(Number);
  
  switch (type) {
    case 'patch':
      parts[2]++;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    default:
      return type; // Custom version
  }
  
  return parts.join('.');
}

async function main() {
  try {
    const currentVersion = getCurrentVersion();
    console.log(`📦 Current version: ${currentVersion}`);
    
    // Check if working directory is clean
    try {
      runCommand('git diff-index --quiet HEAD --', { silent: true });
    } catch {
      const proceed = await question('⚠️  Working directory is not clean. Continue? (y/N): ');
      if (proceed.toLowerCase() !== 'y') {
        process.exit(0);
      }
    }
    
    // Ask for version bump type
    const bumpType = await question('Choose version bump (patch/minor/major/custom): ');
    
    let newVersion;
    if (['patch', 'minor', 'major'].includes(bumpType)) {
      newVersion = getNextVersion(currentVersion, bumpType);
    } else if (bumpType === 'custom') {
      newVersion = await question('Enter new version: ');
    } else {
      newVersion = getNextVersion(currentVersion, 'patch');
    }
    
    console.log(`📦 New version will be: ${newVersion}`);
    
    const confirm = await question('Continue with release? (y/N): ');
    if (confirm.toLowerCase() !== 'y') {
      process.exit(0);
    }
    
    // Run pre-publish checks
    console.log('🔍 Running pre-publish checks...');
    runCommand('node scripts/pre-publish.js');
    
    // Update version
    console.log(`📝 Updating version to ${newVersion}...`);
    updateVersion(newVersion);
    
    // Git operations
    console.log('📝 Committing changes...');
    runCommand(`git add package.json`);
    runCommand(`git commit -m "chore: bump version to ${newVersion}"`);
    runCommand(`git tag -a v${newVersion} -m "Release v${newVersion}"`);
    
    // Publish to NPM
    console.log('📦 Publishing to NPM...');
    runCommand('npm publish');
    
    // Push to git
    console.log('📤 Pushing to git...');
    runCommand('git push');
    runCommand('git push --tags');
    
    console.log(`🎉 Successfully published ${newVersion} to NPM!`);
    
  } catch (error) {
    console.error('❌ Release failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();