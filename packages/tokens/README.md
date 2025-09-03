# Ridge Design Tokens

A comprehensive design token system with built-in dark mode support for the Ridge design system.

## Features

- 🎨 **Semantic Color System** - Light and dark theme variants
- 🌗 **Theme Switching** - Programmatic and automatic theme management
- 📱 **System Preference Support** - Respects `prefers-color-scheme`
- 🔧 **CSS Custom Properties** - Easy integration with any framework
- 📚 **Storybook Integration** - Theme toggle in Storybook toolbar

## Installation

```bash
npm install @ridge/tokens
```

## Usage

### CSS Custom Properties

Import the CSS file in your application:

```css
@import '@ridge/tokens/dist/tokens.css';
```

Use semantic tokens in your styles:

```css
.my-component {
  background-color: var(--color-semantic-background-primary);
  color: var(--color-semantic-text-primary);
  border: 1px solid var(--color-semantic-border-primary);
}
```

### Theme Management

Use the `ThemeManager` utility for programmatic theme control:

```typescript
import { ThemeManager } from '@ridge/tokens';

// Set theme explicitly
ThemeManager.setTheme('dark');
ThemeManager.setTheme('light');
ThemeManager.setTheme('auto'); // Follows system preference

// Get current theme
const currentTheme = ThemeManager.getCurrentTheme(); // 'light' | 'dark' | 'auto'
const resolvedTheme = ThemeManager.getResolvedTheme(); // 'light' | 'dark'

// Toggle between light and dark
ThemeManager.toggleTheme();

// Listen for theme changes
window.addEventListener('theme-changed', (event) => {
  console.log('Theme changed to:', event.detail.theme);
});
```

## Available Themes

### Light Theme (Default)
- Light backgrounds with dark text
- Optimized for daylight usage
- High contrast for accessibility

### Dark Theme
- Dark backgrounds with light text
- Reduced eye strain in low-light conditions
- Modern, sleek appearance

### Auto Theme
- Automatically switches based on system preference
- Uses `prefers-color-scheme` media query
- Falls back to light theme if preference unavailable

## Token Structure

### Semantic Colors

#### Text Colors
- `--color-semantic-text-primary` - Primary text color
- `--color-semantic-text-secondary` - Secondary text color  
- `--color-semantic-text-tertiary` - Tertiary text color
- `--color-semantic-text-inverse` - Inverse text color
- `--color-semantic-text-disabled` - Disabled text color

#### Background Colors
- `--color-semantic-background-primary` - Primary background
- `--color-semantic-background-secondary` - Secondary background
- `--color-semantic-background-tertiary` - Tertiary background
- `--color-semantic-background-inverse` - Inverse background
- `--color-semantic-background-overlay` - Modal/overlay background

#### Border Colors
- `--color-semantic-border-primary` - Primary border
- `--color-semantic-border-secondary` - Secondary border
- `--color-semantic-border-focus` - Focus state border
- `--color-semantic-border-error` - Error state border
- `--color-semantic-border-warning` - Warning state border
- `--color-semantic-border-success` - Success state border

#### Interactive Colors
- `--color-semantic-interactive-primary-*` - Primary interactive states
- `--color-semantic-interactive-secondary-*` - Secondary interactive states

Each interactive color includes: `default`, `hover`, `active`, `disabled`

## Storybook Integration

The theme system is fully integrated with Storybook:

1. **Theme Toggle** - Use the theme selector in the Storybook toolbar
2. **Live Preview** - See components update in real-time when switching themes
3. **Theme Showcase** - Check out the "Theme Showcase" story to see all variants

### Available Options
- **Light Theme** - Standard light appearance
- **Dark Theme** - Dark mode appearance  
- **System Theme** - Automatically follows OS preference

## Best Practices

1. **Always use semantic tokens** instead of brand tokens in components
2. **Test both themes** when developing new components
3. **Consider contrast ratios** for accessibility
4. **Use the ThemeManager** for consistent theme handling
5. **Provide fallback values** in CSS custom properties

## Migration from Previous Version

If you were using the old `semanticColors` export, it now defaults to the light theme. Update your imports:

```typescript
// Before
import { semanticColors } from '@ridge/tokens';

// After - more explicit
import { lightTheme, darkTheme } from '@ridge/tokens';
```

## Development

To regenerate tokens after making changes:

```bash
npm run build
```

This will update both the CSS custom properties and TypeScript exports.
