import { brandColors } from '../src/brand/colors.js';
import { brandSpacing } from '../src/brand/spacing.js';
import { brandTypography } from '../src/brand/typography.js';
import { lightTheme, darkTheme } from '../src/semantic/colors.js';
import * as fs from 'fs';
import * as path from 'path';

interface TokenObject {
  [key: string]: string | number | string[] | readonly string[] | TokenObject;
}

function generateCSSCustomProperties(obj: TokenObject, prefix = ''): string {
  let css = '';
  
  for (const [key, value] of Object.entries(obj)) {
    const cssVar = `--${prefix}${prefix ? '-' : ''}${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    
    if (Array.isArray(value)) {
      // Handle arrays (like font families) by joining with commas
      css += `  ${cssVar}: ${value.join(', ')};\n`;
    } else if (typeof value === 'object' && value !== null) {
      css += generateCSSCustomProperties(value as TokenObject, `${prefix}${prefix ? '-' : ''}${key}`);
    } else {
      css += `  ${cssVar}: ${value};\n`;
    }
  }
  
  return css;
}

function generateTokensCSS(): string {
  // Base tokens (brand colors, spacing, typography)
  const baseTokens = {
    color: {
      brand: brandColors
    },
    spacing: brandSpacing,
    typography: brandTypography
  };

  // Light theme tokens
  const lightTokens = {
    color: {
      semantic: lightTheme
    }
  };

  // Dark theme tokens
  const darkTokens = {
    color: {
      semantic: darkTheme
    }
  };

  let css = '';

  // Base tokens (always available)
  css += ':root {\n';
  css += generateCSSCustomProperties(baseTokens);
  css += '}\n\n';

  // Light theme (default)
  css += ':root,\n[data-theme="light"] {\n';
  css += generateCSSCustomProperties(lightTokens);
  css += '}\n\n';

  // Dark theme (explicit class and media query)
  css += '[data-theme="dark"] {\n';
  css += generateCSSCustomProperties(darkTokens);
  css += '}\n\n';

  // Auto dark mode based on system preference
  css += '@media (prefers-color-scheme: dark) {\n';
  css += '  :root:not([data-theme="light"]) {\n';
  css += generateCSSCustomProperties(darkTokens);
  css += '  }\n';
  css += '}\n';

  return css;
}

// Generate and write CSS file
const cssContent = generateTokensCSS();
const outputPath = path.join(process.cwd(), 'dist', 'tokens.css');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, cssContent);

console.log('✅ CSS tokens generated successfully');