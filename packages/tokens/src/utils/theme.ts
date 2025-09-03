export type Theme = 'light' | 'dark' | 'auto';

/**
 * Theme utility functions for managing application themes
 */
export class ThemeManager {
  private static readonly THEME_ATTRIBUTE = 'data-theme';
  private static readonly STORAGE_KEY = 'ridge-theme';

  /**
   * Set the current theme
   * @param theme - The theme to set ('light', 'dark', or 'auto')
   */
  static setTheme(theme: Theme): void {
    if (theme === 'auto') {
      document.documentElement.removeAttribute(this.THEME_ATTRIBUTE);
    } else {
      document.documentElement.setAttribute(this.THEME_ATTRIBUTE, theme);
    }
    
    // Save to localStorage for persistence
    localStorage.setItem(this.STORAGE_KEY, theme);
    
    // Dispatch custom event for listeners
    window.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme }
    }));
  }

  /**
   * Get the current theme setting
   * @returns The current theme ('light', 'dark', or 'auto')
   */
  static getCurrentTheme(): Theme {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme;
    return stored || 'auto';
  }

  /**
   * Get the resolved theme (what theme is actually being displayed)
   * @returns 'light' or 'dark'
   */
  static getResolvedTheme(): 'light' | 'dark' {
    const current = this.getCurrentTheme();
    
    if (current === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return current;
  }

  /**
   * Toggle between light and dark themes (skips auto)
   */
  static toggleTheme(): void {
    const current = this.getResolvedTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  /**
   * Initialize theme on page load
   */
  static init(): void {
    const savedTheme = this.getCurrentTheme();
    this.setTheme(savedTheme);
    
    // Listen for system theme changes when in auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.getCurrentTheme() === 'auto') {
        // Trigger re-render by temporarily removing and re-adding auto
        document.documentElement.removeAttribute(this.THEME_ATTRIBUTE);
        window.dispatchEvent(new CustomEvent('theme-changed', {
          detail: { theme: 'auto' }
        }));
      }
    });
  }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  // Initialize on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
  } else {
    ThemeManager.init();
  }
}
