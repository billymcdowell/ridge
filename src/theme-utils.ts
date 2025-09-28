/**
 * Theme utilities for Ridge UI components
 */

export type Theme = 'light' | 'dark' | 'high-contrast' | 'ocean' | 'forest' | 'sunset' | 'purple' | 'rose' | 'midnight' | 'monochrome';

/**
 * Sets the theme for the application
 * @param theme - The theme to apply
 * @param element - The element to apply the theme to (defaults to document.documentElement)
 */
export function setTheme(theme: Theme, element: HTMLElement = document.documentElement): void {
  // Remove existing theme classes
  element.classList.remove(
    'rdg-theme-light', 
    'rdg-theme-dark', 
    'rdg-theme-high-contrast',
    'rdg-theme-ocean',
    'rdg-theme-forest',
    'rdg-theme-sunset',
    'rdg-theme-purple',
    'rdg-theme-rose',
    'rdg-theme-midnight',
    'rdg-theme-monochrome'
  );
  
  // Remove existing theme data attributes
  element.removeAttribute('data-theme');
  
  // Apply new theme
  element.classList.add(`rdg-theme-${theme}`);
  element.setAttribute('data-theme', theme);
  
  // Store theme preference
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('rdg-theme', theme);
  }
  
  // Dispatch theme change event
  const event = new CustomEvent('rdg-theme-change', {
    detail: { theme, element },
    bubbles: true,
    composed: true
  });
  element.dispatchEvent(event);
}

/**
 * Gets the current theme
 * @param element - The element to check for theme (defaults to document.documentElement)
 * @returns The current theme or 'light' as default
 */
export function getTheme(element: HTMLElement = document.documentElement): Theme {
  const dataTheme = element.getAttribute('data-theme') as Theme;
  const validThemes: Theme[] = ['light', 'dark', 'high-contrast', 'ocean', 'forest', 'sunset', 'purple', 'rose', 'midnight', 'monochrome'];
  
  if (dataTheme && validThemes.includes(dataTheme)) {
    return dataTheme;
  }
  
  // Check for class-based theme
  if (element.classList.contains('rdg-theme-dark')) return 'dark';
  if (element.classList.contains('rdg-theme-high-contrast')) return 'high-contrast';
  if (element.classList.contains('rdg-theme-ocean')) return 'ocean';
  if (element.classList.contains('rdg-theme-forest')) return 'forest';
  if (element.classList.contains('rdg-theme-sunset')) return 'sunset';
  if (element.classList.contains('rdg-theme-purple')) return 'purple';
  if (element.classList.contains('rdg-theme-rose')) return 'rose';
  if (element.classList.contains('rdg-theme-midnight')) return 'midnight';
  if (element.classList.contains('rdg-theme-monochrome')) return 'monochrome';
  
  return 'light';
}

/**
 * Toggles between light and dark themes
 * @param element - The element to toggle theme on (defaults to document.documentElement)
 */
export function toggleTheme(element: HTMLElement = document.documentElement): void {
  const currentTheme = getTheme(element);
  const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme, element);
}

/**
 * Cycles through all available themes
 * @param element - The element to cycle theme on (defaults to document.documentElement)
 * @param themes - Optional array of themes to cycle through (defaults to all themes)
 */
export function cycleTheme(element: HTMLElement = document.documentElement, themes?: Theme[]): void {
  const allThemes: Theme[] = ['light', 'dark', 'high-contrast', 'ocean', 'forest', 'sunset', 'purple', 'rose', 'midnight', 'monochrome'];
  const themesToCycle = themes || allThemes;
  const currentTheme = getTheme(element);
  const currentIndex = themesToCycle.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themesToCycle.length;
  setTheme(themesToCycle[nextIndex], element);
}

/**
 * Gets all available themes
 * @returns Array of all available theme names
 */
export function getAvailableThemes(): Theme[] {
  return ['light', 'dark', 'high-contrast', 'ocean', 'forest', 'sunset', 'purple', 'rose', 'midnight', 'monochrome'];
}

/**
 * Initializes theme based on user preference or system preference
 * @param element - The element to initialize theme on (defaults to document.documentElement)
 */
export function initializeTheme(element: HTMLElement = document.documentElement): void {
  // Check for stored preference
  let theme: Theme = 'light';
  const validThemes: Theme[] = ['light', 'dark', 'high-contrast', 'ocean', 'forest', 'sunset', 'purple', 'rose', 'midnight', 'monochrome'];
  
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('rdg-theme') as Theme;
    if (stored && validThemes.includes(stored)) {
      theme = stored;
    }
  }
  
  // If no stored preference, check system preference
  if (theme === 'light' && typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = 'dark';
    }
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      theme = 'high-contrast';
    }
  }
  
  setTheme(theme, element);
}

/**
 * Watches for system theme changes and updates accordingly
 * @param element - The element to update theme on (defaults to document.documentElement)
 * @returns A function to stop watching for changes
 */
export function watchSystemTheme(element: HTMLElement = document.documentElement): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {}; // No-op for SSR
  }
  
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
  
  const updateTheme = () => {
    // Only update if no manual theme has been set
    const hasStoredTheme = typeof localStorage !== 'undefined' && localStorage.getItem('rdg-theme');
    if (hasStoredTheme) return;
    
    let theme: Theme = 'light';
    if (highContrastQuery.matches) {
      theme = 'high-contrast';
    } else if (darkModeQuery.matches) {
      theme = 'dark';
    }
    
    setTheme(theme, element);
  };
  
  // Add listeners
  darkModeQuery.addEventListener('change', updateTheme);
  highContrastQuery.addEventListener('change', updateTheme);
  
  // Return cleanup function
  return () => {
    darkModeQuery.removeEventListener('change', updateTheme);
    highContrastQuery.removeEventListener('change', updateTheme);
  };
}

/**
 * Gets a CSS custom property value for the current theme
 * @param property - The CSS custom property name (with or without --)
 * @param element - The element to get the property from (defaults to document.documentElement)
 * @returns The computed value of the CSS custom property
 */
export function getThemeProperty(property: string, element: HTMLElement = document.documentElement): string {
  const propName = property.startsWith('--') ? property : `--${property}`;
  return getComputedStyle(element).getPropertyValue(propName).trim();
}

/**
 * Sets a CSS custom property value
 * @param property - The CSS custom property name (with or without --)
 * @param value - The value to set
 * @param element - The element to set the property on (defaults to document.documentElement)
 */
export function setThemeProperty(property: string, value: string, element: HTMLElement = document.documentElement): void {
  const propName = property.startsWith('--') ? property : `--${property}`;
  element.style.setProperty(propName, value);
}

/**
 * Creates a theme object with all current CSS custom property values
 * @param element - The element to read properties from (defaults to document.documentElement)
 * @returns An object containing all Ridge UI theme properties
 */
export function exportTheme(element: HTMLElement = document.documentElement): Record<string, string> {
  const computedStyle = getComputedStyle(element);
  const theme: Record<string, string> = {};
  
  // Get all CSS custom properties that start with --rdg-
  for (let i = 0; i < computedStyle.length; i++) {
    const property = computedStyle[i];
    if (property.startsWith('--rdg-')) {
      theme[property] = computedStyle.getPropertyValue(property).trim();
    }
  }
  
  return theme;
}

/**
 * Applies a theme object to an element
 * @param themeObject - An object containing CSS custom property values
 * @param element - The element to apply the theme to (defaults to document.documentElement)
 */
export function importTheme(themeObject: Record<string, string>, element: HTMLElement = document.documentElement): void {
  Object.entries(themeObject).forEach(([property, value]) => {
    setThemeProperty(property, value, element);
  });
}
