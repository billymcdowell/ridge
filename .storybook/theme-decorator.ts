import type { Decorator } from '@storybook/web-components';

/**
 * Theme decorator that applies the selected theme to the document root
 * and manages the theme state across stories
 */
export const themeDecorator: Decorator = (story, context) => {
  const theme = context.globals.theme || 'light';
  
  // Apply theme to document root
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  // Update background parameter based on theme for better visual consistency
  if (context.parameters.backgrounds) {
    context.parameters.backgrounds.default = theme === 'dark' ? 'dark' : 'light';
  }
  
  // Simply return the story - let Storybook handle the rendering
  // The theme is applied via data-theme attribute on document root
  return story();
};
