import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../packages/components/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-backgrounds',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  typescript: {
    check: false,
    // checkOptions: {},
  },
};

export default config;