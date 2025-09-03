import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './button.js';
import type { Button } from './button.js';

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: 'my-button',
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and states.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => html`
    <my-button 
      variant="${args.variant}" 
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Click me
    </my-button>
  `,
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => html`
    <my-button 
      variant="${args.variant}" 
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
    >
      Click me
    </my-button>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <my-button variant="primary">Primary</my-button>
      <my-button variant="secondary">Secondary</my-button>
      <my-button variant="outline">Outline</my-button>
      <my-button variant="ghost">Ghost</my-button>
    </div>
  `,
};

export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <my-button size="sm">Small</my-button>
      <my-button size="md">Medium</my-button>
      <my-button size="lg">Large</my-button>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <my-button>Normal</my-button>
      <my-button disabled>Disabled</my-button>
      <my-button loading>Loading</my-button>
    </div>
  `,
};

export const ThemeShowcase: Story = {
  render: () => html`
    <div style="
      padding: var(--spacing-6, 1.5rem);
      background-color: var(--color-semantic-background-primary);
      color: var(--color-semantic-text-primary);
      border-radius: 0.5rem;
      border: 1px solid var(--color-semantic-border-primary);
      transition: all 0.2s ease-in-out;
    ">
      <h3 style="
        margin: 0 0 var(--spacing-4, 1rem) 0;
        color: var(--color-semantic-text-primary);
        font-size: var(--typography-font-sizes-lg, 1.125rem);
        font-weight: var(--typography-font-weights-semibold, 600);
      ">
        Theme Showcase
      </h3>
      <p style="
        margin: 0 0 var(--spacing-4, 1rem) 0;
        color: var(--color-semantic-text-secondary);
        font-size: var(--typography-font-sizes-sm, 0.875rem);
      ">
        Use the theme toggle in the toolbar above to switch between light and dark themes.
      </p>
      <div style="display: flex; gap: var(--spacing-3, 0.75rem); flex-wrap: wrap; align-items: center;">
        <my-button variant="primary">Primary</my-button>
        <my-button variant="secondary">Secondary</my-button>
        <my-button variant="outline">Outline</my-button>
        <my-button variant="ghost">Ghost</my-button>
      </div>
    </div>
  `,
};