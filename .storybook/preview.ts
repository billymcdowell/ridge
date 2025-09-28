import type { Preview } from '@storybook/web-components-vite'
import '../src/theme.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--rdg-background)' },
        { name: 'dark', value: 'var(--rdg-background)' },
        { name: 'high-contrast', value: 'var(--rdg-background)' },
        { name: 'ocean', value: 'var(--rdg-background)' },
        { name: 'forest', value: 'var(--rdg-background)' },
        { name: 'sunset', value: 'var(--rdg-background)' },
        { name: 'purple', value: 'var(--rdg-background)' },
        { name: 'rose', value: 'var(--rdg-background)' },
        { name: 'midnight', value: 'var(--rdg-background)' },
        { name: 'monochrome', value: 'var(--rdg-background)' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1024px', height: '768px' },
        },
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'high-contrast', title: 'High Contrast', icon: 'contrast' },
          { value: 'ocean', title: 'Ocean', icon: 'circle' },
          { value: 'forest', title: 'Forest', icon: 'circle' },
          { value: 'sunset', title: 'Sunset', icon: 'circle' },
          { value: 'purple', title: 'Purple', icon: 'circle' },
          { value: 'rose', title: 'Rose', icon: 'circle' },
          { value: 'midnight', title: 'Midnight', icon: 'circle' },
          { value: 'monochrome', title: 'Monochrome', icon: 'circle' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'light';
      
      // Apply theme to the document element
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.className = document.documentElement.className
        .replace(/rdg-theme-\w+/g, '')
        .trim();
      document.documentElement.classList.add(`rdg-theme-${theme}`);
      
      return story();
    },
  ],
};

export default preview;