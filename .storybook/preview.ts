import type { Preview } from '@storybook/web-components';
import '../packages/tokens/dist/tokens.css';
import { themeDecorator } from './theme-decorator.js';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      story: {
        inline: true,
      },
      theme: {
        base: 'light',
        colorPrimary: '#0284c7',
        colorSecondary: '#ca8a04',
        appBg: 'var(--color-semantic-background-primary)',
        appContentBg: 'var(--color-semantic-background-secondary)',
        textColor: 'var(--color-semantic-text-primary)',
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'var(--color-semantic-background-primary)',
        },
        {
          name: 'dark', 
          value: 'var(--color-semantic-background-primary)',
        },
      ],
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'contrast',
        items: [
          { value: 'light', title: 'Light Theme', icon: 'sun' },
          { value: 'dark', title: 'Dark Theme', icon: 'moon' },
          { value: 'auto', title: 'System Theme', icon: 'browser' }
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [themeDecorator],
};

export default preview;