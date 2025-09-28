# Ridge UI Theming Guide

Ridge UI provides a comprehensive theming system using CSS custom properties (CSS variables) that allows you to easily customize the appearance of all components.

## Quick Start

### 1. Import the Theme CSS

```css
@import 'ridge-ui/src/theme.css';
```

### 2. Use Theme Utilities

```javascript
import { setTheme, getTheme, toggleTheme } from 'ridge-ui';

// Set a specific theme
setTheme('dark');

// Get current theme
const currentTheme = getTheme(); // 'light', 'dark', or 'high-contrast'

// Toggle between light and dark
toggleTheme();
```

## Available Themes

Ridge UI comes with ten built-in themes:

### Core Themes
- **Light Theme** (`light`) - Default light theme with clean, modern colors
- **Dark Theme** (`dark`) - Dark theme optimized for low-light environments
- **High Contrast Theme** (`high-contrast`) - High contrast theme for accessibility

### Color Themes
- **Ocean Theme** (`ocean`) - Refreshing cyan and teal colors inspired by the ocean
- **Forest Theme** (`forest`) - Natural green tones inspired by nature
- **Sunset Theme** (`sunset`) - Warm orange and amber colors inspired by sunsets
- **Purple Theme** (`purple`) - Rich purple and violet tones
- **Rose Theme** (`rose`) - Elegant pink and rose colors

### Special Themes
- **Midnight Theme** (`midnight`) - Deep dark theme with purple accents
- **Monochrome Theme** (`monochrome`) - Grayscale theme for minimal aesthetics

## Theme Variables

### Color Palette

Ridge UI uses a comprehensive color system with semantic naming:

```css
:root {
  /* Primary Colors */
  --rdg-primary: #3b82f6;
  --rdg-primary-hover: #2563eb;
  --rdg-primary-active: #1d4ed8;
  --rdg-primary-light: #dbeafe;
  --rdg-primary-lighter: #eff6ff;

  /* Secondary Colors */
  --rdg-secondary: #6b7280;
  --rdg-secondary-hover: #4b5563;
  --rdg-secondary-active: #374151;

  /* Semantic Colors */
  --rdg-success: #22c55e;
  --rdg-warning: #f59e0b;
  --rdg-error: #dc2626;

  /* Surface Colors */
  --rdg-background: #ffffff;
  --rdg-surface: #ffffff;
  --rdg-surface-variant: #f9fafb;
  --rdg-surface-hover: #f3f4f6;
  --rdg-surface-active: #e5e7eb;

  /* Text Colors */
  --rdg-text-primary: #111827;
  --rdg-text-secondary: #374151;
  --rdg-text-tertiary: #6b7280;
  --rdg-text-disabled: #9ca3af;
  --rdg-text-placeholder: #9ca3af;
  --rdg-text-on-primary: #ffffff;

  /* Border Colors */
  --rdg-border-primary: #d1d5db;
  --rdg-border-secondary: #e5e7eb;
  --rdg-border-hover: #9ca3af;
  --rdg-border-focus: #3b82f6;
  --rdg-border-error: #dc2626;
}
```

### Spacing

```css
:root {
  --rdg-space-0: 0;
  --rdg-space-1: 0.25rem;
  --rdg-space-2: 0.5rem;
  --rdg-space-3: 0.75rem;
  --rdg-space-4: 1rem;
  --rdg-space-5: 1.25rem;
  --rdg-space-6: 1.5rem;
  --rdg-space-8: 2rem;
  --rdg-space-10: 2.5rem;
  --rdg-space-12: 3rem;
}
```

### Typography

```css
:root {
  --rdg-font-family: system-ui, -apple-system, sans-serif;
  --rdg-font-size-xs: 0.75rem;
  --rdg-font-size-sm: 0.875rem;
  --rdg-font-size-base: 1rem;
  --rdg-font-size-lg: 1.125rem;
  --rdg-font-size-xl: 1.25rem;
  --rdg-font-weight-normal: 400;
  --rdg-font-weight-medium: 500;
  --rdg-font-weight-semibold: 600;
  --rdg-font-weight-bold: 700;
}
```

### Border Radius

```css
:root {
  --rdg-radius-sm: 0.25rem;
  --rdg-radius: 0.375rem;
  --rdg-radius-md: 0.5rem;
  --rdg-radius-lg: 0.75rem;
  --rdg-radius-xl: 1rem;
  --rdg-radius-full: 9999px;
}
```

### Shadows

```css
:root {
  --rdg-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --rdg-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --rdg-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --rdg-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
```

## Creating Custom Themes

### Method 1: Override CSS Variables

Create a custom theme by overriding the CSS variables:

```css
[data-theme="custom"] {
  --rdg-primary: #8b5cf6;
  --rdg-primary-hover: #7c3aed;
  --rdg-primary-active: #6d28d9;
  --rdg-background: #faf5ff;
  --rdg-surface: #ffffff;
  --rdg-text-primary: #1f2937;
}
```

### Method 2: Use Theme Utilities

```javascript
import { setThemeProperty, exportTheme, importTheme } from 'ridge-ui';

// Set individual properties
setThemeProperty('--rdg-primary', '#8b5cf6');
setThemeProperty('--rdg-primary-hover', '#7c3aed');

// Export current theme
const currentTheme = exportTheme();

// Create a modified theme
const customTheme = {
  ...currentTheme,
  '--rdg-primary': '#8b5cf6',
  '--rdg-primary-hover': '#7c3aed',
};

// Apply the custom theme
importTheme(customTheme);
```

## Theme Utilities API

### Core Functions

#### `setTheme(theme, element?)`
Sets the theme for the application.

```javascript
setTheme('dark'); // Apply dark theme
setTheme('ocean'); // Apply ocean theme
setTheme('light', document.getElementById('my-app')); // Apply to specific element
```

#### `getTheme(element?)`
Gets the current theme.

```javascript
const theme = getTheme(); // Returns current theme name
```

#### `toggleTheme(element?)`
Toggles between light and dark themes.

```javascript
toggleTheme(); // Switches between light and dark
```

#### `initializeTheme(element?)`
Initializes theme based on user preference or system preference.

```javascript
initializeTheme(); // Sets theme based on localStorage or system preference
```

#### `cycleTheme(element?, themes?)`
Cycles through all available themes or a custom list of themes.

```javascript
cycleTheme(); // Cycles through all themes
cycleTheme(document.body, ['light', 'dark', 'ocean']); // Custom theme list
```

#### `getAvailableThemes()`
Gets all available theme names.

```javascript
const themes = getAvailableThemes(); 
// Returns: ['light', 'dark', 'high-contrast', 'ocean', 'forest', 'sunset', 'purple', 'rose', 'midnight', 'monochrome']
```

### Advanced Functions

#### `watchSystemTheme(element?)`
Watches for system theme changes and updates accordingly.

```javascript
const stopWatching = watchSystemTheme();
// Later, stop watching
stopWatching();
```

#### `getThemeProperty(property, element?)`
Gets a CSS custom property value.

```javascript
const primaryColor = getThemeProperty('rdg-primary');
const borderRadius = getThemeProperty('--rdg-radius');
```

#### `setThemeProperty(property, value, element?)`
Sets a CSS custom property value.

```javascript
setThemeProperty('rdg-primary', '#8b5cf6');
setThemeProperty('--rdg-border-radius', '8px');
```

#### `exportTheme(element?)`
Exports all theme properties as an object.

```javascript
const themeObject = exportTheme();
console.log(themeObject);
// { '--rdg-primary': '#3b82f6', '--rdg-secondary': '#6b7280', ... }
```

#### `importTheme(themeObject, element?)`
Imports a theme object.

```javascript
const customTheme = {
  '--rdg-primary': '#8b5cf6',
  '--rdg-secondary': '#64748b',
};
importTheme(customTheme);
```

## Events

Ridge UI dispatches custom events when themes change:

```javascript
document.addEventListener('rdg-theme-change', (event) => {
  console.log('Theme changed to:', event.detail.theme);
  console.log('Applied to element:', event.detail.element);
});
```

## Accessibility

### High Contrast Theme

The high contrast theme is designed for users who need higher contrast for better visibility:

```javascript
setTheme('high-contrast');
```

### Theme Cycling

You can easily cycle through themes for user preference testing:

```javascript
// Cycle through all themes
cycleTheme();

// Cycle through specific themes
cycleTheme(document.body, ['light', 'ocean', 'forest', 'sunset']);
```

### Reduced Motion

Ridge UI respects the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
```

### System Preferences

Ridge UI automatically detects and applies system preferences:

- `prefers-color-scheme: dark` → Dark theme
- `prefers-contrast: high` → High contrast theme

## Framework Integration

### React

```jsx
import { useEffect } from 'react';
import { setTheme, initializeTheme } from 'ridge-ui';

function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div>
      <button onClick={() => setTheme('dark')}>Dark Theme</button>
      <button onClick={() => setTheme('light')}>Light Theme</button>
    </div>
  );
}
```

### Vue

```vue
<template>
  <div>
    <button @click="setTheme('dark')">Dark Theme</button>
    <button @click="setTheme('light')">Light Theme</button>
  </div>
</template>

<script>
import { setTheme, initializeTheme } from 'ridge-ui';

export default {
  mounted() {
    initializeTheme();
  },
  methods: {
    setTheme
  }
}
</script>
```

### Angular

```typescript
import { Component, OnInit } from '@angular/core';
import { setTheme, initializeTheme } from 'ridge-ui';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="setTheme('dark')">Dark Theme</button>
    <button (click)="setTheme('light')">Light Theme</button>
  `
})
export class AppComponent implements OnInit {
  ngOnInit() {
    initializeTheme();
  }

  setTheme = setTheme;
}
```

## Best Practices

1. **Use Semantic Variables**: Use semantic color variables like `--rdg-primary` instead of specific color values.

2. **Test All Themes**: Always test your application with all available themes.

3. **Respect System Preferences**: Use `initializeTheme()` to respect user's system preferences.

4. **Provide Theme Controls**: Give users the ability to manually switch themes.

5. **Consider Accessibility**: Ensure sufficient contrast ratios in custom themes.

6. **Use Theme Events**: Listen to theme change events to update any custom styling.

## Troubleshooting

### Theme Not Applying

Make sure you've imported the theme CSS:

```css
@import 'ridge-ui/src/theme.css';
```

### Variables Not Working

Ensure you're using the correct variable names with the `--rdg-` prefix:

```css
/* Correct */
color: var(--rdg-text-primary);

/* Incorrect */
color: var(--text-primary);
```

### Custom Theme Not Persisting

The theme is automatically saved to localStorage. If it's not persisting, check that localStorage is available and not blocked.

### Storybook Integration

Ridge UI includes Storybook integration with theme controls. The theme toolbar allows you to switch between themes while developing components.
