import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from 'storybook/actions';
import './button'; // Import your component
import type { RdgButton } from './button';

// Add event listener for the custom button-click event
document.addEventListener('button-click', action('button-click'));

const meta: Meta<RdgButton> = {
  title: 'Components/Button',
  component: 'rdg-button',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable button component built with Lit and TypeScript. Supports multiple variants, sizes, states, and can render as either a button or link.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'The visual style variant of the button',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      defaultValue: 'medium',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
      defaultValue: false,
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type',
      defaultValue: 'button',
    },
    href: {
      control: { type: 'text' },
      description: 'URL to navigate to (renders as anchor tag)',
    },
    target: {
      control: { type: 'text' },
      description: 'Target attribute for links',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    type: 'button',
  },
};

export default meta;
type Story = StoryObj<RdgButton>;

// Default story
export const Default: Story = {
  args: {},
  render: (args) => html`
    <rdg-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      type="${args.type}"
      href="${args.href || ''}"
      target="${args.target || ''}"
    >
      Click me
    </rdg-button>
  `,
};

// All Variants
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rdg-button variant="primary">Primary</rdg-button>
      <rdg-button variant="secondary">Secondary</rdg-button>
      <rdg-button variant="outline">Outline</rdg-button>
      <rdg-button variant="ghost">Ghost</rdg-button>
      <rdg-button variant="danger">Danger</rdg-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed side by side.',
      },
    },
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rdg-button size="small">Small</rdg-button>
      <rdg-button size="medium">Medium</rdg-button>
      <rdg-button size="large">Large</rdg-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed side by side.',
      },
    },
  },
};

// States
export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rdg-button>Normal</rdg-button>
      <rdg-button disabled>Disabled</rdg-button>
      <rdg-button loading>Loading</rdg-button>
      <rdg-button disabled loading>Disabled Loading</rdg-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different button states including normal, disabled, loading, and disabled loading.',
      },
    },
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rdg-button variant="primary">
        <span style="margin-right: 0.5rem;">🚀</span>
        Launch
      </rdg-button>
      <rdg-button variant="secondary">
        <span style="margin-right: 0.5rem;">💾</span>
        Save
      </rdg-button>
      <rdg-button variant="outline">
        <span style="margin-right: 0.5rem;">📤</span>
        Export
      </rdg-button>
      <rdg-button variant="danger">
        <span style="margin-right: 0.5rem;">🗑️</span>
        Delete
      </rdg-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons using emoji or you can use any icon library.',
      },
    },
  },
};

// As Links
export const AsLinks: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rdg-button href="https://lit.dev" target="_blank">
        External Link
      </rdg-button>
      <rdg-button href="/docs" variant="secondary">
        Internal Link
      </rdg-button>
      <rdg-button href="https://storybook.js.org" variant="outline" target="_blank">
        Storybook Docs
      </rdg-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Buttons rendered as anchor tags when href is provided.',
      },
    },
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    type: 'button',
  },
  render: (args) => html`
    <rdg-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      ?loading="${args.loading}"
      type="${args.type}"
      href="${args.href || ''}"
      target="${args.target || ''}"
    >
      ${args.loading ? 'Loading...' : 'Interactive Button'}
    </rdg-button>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props. Use the controls panel to modify the button properties.',
      },
    },
  },
};

// Size Variants Matrix
export const SizeVariantMatrix: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; align-items: center;">
      <!-- Header -->
      <div style="font-weight: bold; text-align: center;">Size</div>
      <div style="font-weight: bold; text-align: center;">Primary</div>
      <div style="font-weight: bold; text-align: center;">Secondary</div>
      <div style="font-weight: bold; text-align: center;">Outline</div>
      <div style="font-weight: bold; text-align: center;">Ghost</div>
      <div style="font-weight: bold; text-align: center;">Danger</div>
      
      <!-- Small row -->
      <div style="font-weight: bold;">Small</div>
      <rdg-button variant="primary" size="small">Button</rdg-button>
      <rdg-button variant="secondary" size="small">Button</rdg-button>
      <rdg-button variant="outline" size="small">Button</rdg-button>
      <rdg-button variant="ghost" size="small">Button</rdg-button>
      <rdg-button variant="danger" size="small">Button</rdg-button>
      
      <!-- Medium row -->
      <div style="font-weight: bold;">Medium</div>
      <rdg-button variant="primary" size="medium">Button</rdg-button>
      <rdg-button variant="secondary" size="medium">Button</rdg-button>
      <rdg-button variant="outline" size="medium">Button</rdg-button>
      <rdg-button variant="ghost" size="medium">Button</rdg-button>
      <rdg-button variant="danger" size="medium">Button</rdg-button>
      
      <!-- Large row -->
      <div style="font-weight: bold;">Large</div>
      <rdg-button variant="primary" size="large">Button</rdg-button>
      <rdg-button variant="secondary" size="large">Button</rdg-button>
      <rdg-button variant="outline" size="large">Button</rdg-button>
      <rdg-button variant="ghost" size="large">Button</rdg-button>
      <rdg-button variant="danger" size="large">Button</rdg-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive matrix showing all size and variant combinations.',
      },
    },
  },
};

// Event Handling Example
export const EventHandling: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <rdg-button
        @button-click="${(e: CustomEvent) => {
          console.log('Custom event fired:', e.detail);
          alert('Button clicked! Check the console and Actions tab.');
        }}"
      >
        Click for Alert
      </rdg-button>
      
      <rdg-button
        variant="secondary"
        @button-click="${(e: CustomEvent) => {
          e.detail.originalEvent.target.textContent = 'Clicked!';
          setTimeout(() => {
            e.detail.originalEvent.target.textContent = 'Click Again';
          }, 1000);
        }}"
      >
        Dynamic Text
      </rdg-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Examples of handling the custom button-click event. The first button shows an alert, the second changes its text temporarily.',
      },
    },
  },
};