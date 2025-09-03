#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync } from 'fs';

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`Failed to run: ${command}`);
    return false;
  }
}

function checkPackageJson() {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
  
  const requiredFields = ['name', 'version', 'description', 'main', 'module', 'types'];
  const missing = requiredFields.filter(field => !pkg[field]);
  
  if (missing.length > 0) {
    console.error(`Missing required package.json fields: ${missing.join(', ')}`);
    return false;
  }
  
  return true;
}

console.log('🔍 Running pre-publish checks...');

// Check package.json
if (!checkPackageJson()) {
  process.exit(1);
}

// Clean and build
console.log('🧹 Cleaning previous builds...');
if (!runCommand('npm run clean')) process.exit(1);

console.log('🔨 Building project...');
if (!runCommand('npm run build')) process.exit(1);

// Run tests
console.log('🧪 Running tests...');
if (!runCommand('npm test')) process.exit(1);

// Lint
console.log('🔍 Running linter...');
if (!runCommand('npm run lint')) process.exit(1);

// Build Storybook (optional)
console.log('📖 Building Storybook...');
if (!runCommand('npm run build-storybook')) {
  console.warn('⚠️  Storybook build failed, continuing...');
}

console.log('✅ All pre-publish checks passed!');