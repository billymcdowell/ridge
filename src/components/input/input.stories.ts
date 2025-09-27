import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from 'storybook/actions';
import './input'; // Import your component
import type { RdgInput } from './input';

// Add event listeners for the custom input events
document.addEventListener('input-change', action('input-change'));
document.addEventListener('input-focus', action('input-focus'));
document.addEventListener('input-blur', action('input-blur'));

const meta: Meta<RdgInput> = {
  title: 'Components/Input',
  component: 'rdg-input',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable input component built with Lit and TypeScript. Supports multiple variants, sizes, input types, and includes features like labels, icons, and password visibility toggle.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'filled', 'plain'],
      description: 'The visual style variant of the input',
      defaultValue: 'outlined',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the input',
      defaultValue: 'medium',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email'],
      description: 'The input type',
      defaultValue: 'text',
    },
    value: {
      control: { type: 'text' },
      description: 'The current value of the input',
      defaultValue: '',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the input',
    },
    name: {
      control: { type: 'text' },
      description: 'Name attribute for the input',
    },
    id: {
      control: { type: 'text' },
      description: 'ID attribute for the input',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled',
      defaultValue: false,
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required',
      defaultValue: false,
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Whether the input is readonly',
      defaultValue: false,
    },
    autocomplete: {
      control: { type: 'text' },
      description: 'Autocomplete attribute for the input',
    },
    leadingIcon: {
      control: { type: 'text' },
      description: 'Leading icon (emoji or HTML)',
    },
    trailingIcon: {
      control: { type: 'text' },
      description: 'Trailing icon (emoji or HTML)',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message to display',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text to display',
    },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    type: 'text',
    value: '',
    disabled: false,
    required: false,
    readonly: false,
  },
};

export default meta;
type Story = StoryObj<RdgInput>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  render: (args) => html`
    <rdg-input
      variant="${args.variant}"
      size="${args.size}"
      type="${args.type}"
      .value="${args.value}"
      placeholder="${args.placeholder}"
      label="${args.label || ''}"
      name="${args.name || ''}"
      id="${args.id || ''}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
      autocomplete="${args.autocomplete || ''}"
      leading-icon="${args.leadingIcon || ''}"
      trailing-icon="${args.trailingIcon || ''}"
      error-message="${args.errorMessage || ''}"
      helper-text="${args.helperText || ''}"
    ></rdg-input>
  `,
};

// All Variants
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 320px;">
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Outlined</h4>
        <rdg-input variant="outlined" placeholder="Outlined input" label="Outlined Input"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Filled</h4>
        <rdg-input variant="filled" placeholder="Filled input" label="Filled Input"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Plain</h4>
        <rdg-input variant="plain" placeholder="Plain input" label="Plain Input"></rdg-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available input variants: outlined (default), filled, and plain with minimal styling.',
      },
    },
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 320px;">
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Small</h4>
        <rdg-input size="small" placeholder="Small input" label="Small Input"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Medium</h4>
        <rdg-input size="medium" placeholder="Medium input" label="Medium Input"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Large</h4>
        <rdg-input size="large" placeholder="Large input" label="Large Input"></rdg-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available input sizes: small, medium (default), and large.',
      },
    },
  },
};

// Input Types
export const InputTypes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 320px;">
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Text</h4>
        <rdg-input type="text" placeholder="Enter text" label="Text Input"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Email</h4>
        <rdg-input type="email" placeholder="Enter email" label="Email Input" leading-icon="📧"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Password</h4>
        <rdg-input type="password" placeholder="Enter password" label="Password Input" leading-icon="🔒"></rdg-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different input types: text, email, and password. Password inputs include a visibility toggle button.',
      },
    },
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 320px;">
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Leading Icon</h4>
        <rdg-input placeholder="Search..." label="Search" leading-icon="🔍"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Trailing Icon</h4>
        <rdg-input placeholder="Enter amount" label="Amount" trailing-icon="💰"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Both Icons</h4>
        <rdg-input placeholder="Username" label="Username" leading-icon="👤" trailing-icon="✓"></rdg-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Inputs with leading and trailing icons. Icons can be emoji or HTML/SVG.',
      },
    },
  },
};

// States
export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 320px;">
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Normal</h4>
        <rdg-input placeholder="Normal state" label="Normal Input"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Disabled</h4>
        <rdg-input placeholder="Disabled state" label="Disabled Input" disabled value="Disabled value"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Readonly</h4>
        <rdg-input placeholder="Readonly state" label="Readonly Input" readonly value="Readonly value"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Required</h4>
        <rdg-input placeholder="Required field" label="Required Input" required></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">With Error</h4>
        <rdg-input placeholder="Invalid input" label="Input with Error" error-message="This field is required"></rdg-input>
      </div>
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">With Helper Text</h4>
        <rdg-input placeholder="Input with help" label="Input with Helper" helper-text="This is helpful information"></rdg-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different input states: normal, disabled, readonly, required, with error message, and with helper text.',
      },
    },
  },
};

// Size Variant Matrix
export const SizeVariantMatrix: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; align-items: end; width: 100%; max-width: 1200px;">
      <!-- Header -->
      <div style="font-weight: bold; text-align: center; padding-bottom: 1rem;">Size</div>
      <div style="font-weight: bold; text-align: center; padding-bottom: 1rem;">Outlined</div>
      <div style="font-weight: bold; text-align: center; padding-bottom: 1rem;">Filled</div>
      <div style="font-weight: bold; text-align: center; padding-bottom: 1rem;">Plain</div>
      
      <!-- Small row -->
      <div style="font-weight: bold; align-self: center;">Small</div>
      <rdg-input variant="outlined" size="small" placeholder="Small outlined" label="Small"></rdg-input>
      <rdg-input variant="filled" size="small" placeholder="Small filled" label="Small"></rdg-input>
      <rdg-input variant="plain" size="small" placeholder="Small plain" label="Small"></rdg-input>
      
      <!-- Medium row -->
      <div style="font-weight: bold; align-self: center;">Medium</div>
      <rdg-input variant="outlined" size="medium" placeholder="Medium outlined" label="Medium"></rdg-input>
      <rdg-input variant="filled" size="medium" placeholder="Medium filled" label="Medium"></rdg-input>
      <rdg-input variant="plain" size="medium" placeholder="Medium plain" label="Medium"></rdg-input>
      
      <!-- Large row -->
      <div style="font-weight: bold; align-self: center;">Large</div>
      <rdg-input variant="outlined" size="large" placeholder="Large outlined" label="Large"></rdg-input>
      <rdg-input variant="filled" size="large" placeholder="Large filled" label="Large"></rdg-input>
      <rdg-input variant="plain" size="large" placeholder="Large plain" label="Large"></rdg-input>
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

// Form Examples
export const FormExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 320px;">
      <div style="width: 100%;">
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; font-weight: 600;">Login Form</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <rdg-input
            type="email"
            placeholder="Enter your email"
            label="Email"
            leading-icon="📧"
            required
            autocomplete="email"
          ></rdg-input>
          <rdg-input
            type="password"
            placeholder="Enter your password"
            label="Password"
            leading-icon="🔒"
            required
            autocomplete="current-password"
          ></rdg-input>
        </div>
      </div>
      
      <div style="width: 100%;">
        <h4 style="margin: 0 0 1rem 0; font-size: 1rem; font-weight: 600;">Profile Form</h4>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <rdg-input
            variant="filled"
            placeholder="John Doe"
            label="Full Name"
            leading-icon="👤"
            required
          ></rdg-input>
          <rdg-input
            variant="filled"
            type="email"
            placeholder="john@example.com"
            label="Email Address"
            leading-icon="📧"
            required
          ></rdg-input>
          <rdg-input
            variant="filled"
            placeholder="Software Engineer"
            label="Job Title"
            leading-icon="💼"
            helper-text="Optional field"
          ></rdg-input>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world form examples showing how inputs work together in common scenarios.',
      },
    },
  },
};

// Interactive Playground
export const Playground: Story = {
  args: {
    variant: 'outlined',
    size: 'medium',
    type: 'text',
    placeholder: 'Enter text...',
    label: 'Input Label',
    helperText: 'This is helper text',
    disabled: false,
    required: false,
    readonly: false,
  },
  render: (args) => html`
    <div style="width: 320px;">
      <rdg-input
        variant="${args.variant}"
        size="${args.size}"
        type="${args.type}"
        .value="${args.value}"
        placeholder="${args.placeholder}"
        label="${args.label || ''}"
        name="${args.name || ''}"
        id="${args.id || ''}"
        ?disabled="${args.disabled}"
        ?required="${args.required}"
        ?readonly="${args.readonly}"
        autocomplete="${args.autocomplete || ''}"
        leading-icon="${args.leadingIcon || ''}"
        trailing-icon="${args.trailingIcon || ''}"
        error-message="${args.errorMessage || ''}"
        helper-text="${args.helperText || ''}"
        @input-change="${(e: CustomEvent) => {
          console.log('Input changed:', e.detail);
        }}"
        @input-focus="${(e: CustomEvent) => {
          console.log('Input focused:', e.detail);
        }}"
        @input-blur="${(e: CustomEvent) => {
          console.log('Input blurred:', e.detail);
        }}"
      ></rdg-input>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props. Use the controls panel to modify the input properties.',
      },
    },
  },
};

// Event Handling Example
export const EventHandling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1.5rem; align-items: flex-start; width: 320px;">
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Real-time Validation</h4>
        <rdg-input
          type="email"
          placeholder="Enter email"
          label="Email"
          leading-icon="📧"
          @input-change="${(e: CustomEvent) => {
            const input = e.target as any;
            const isValid = e.detail.value.includes('@');
            if (e.detail.value && !isValid) {
              input.setAttribute('error-message', 'Please enter a valid email');
            } else {
              input.removeAttribute('error-message');
            }
          }}"
        ></rdg-input>
      </div>
      
      <div style="width: 100%;">
        <h4 style="margin: 0 0 0.5rem 0; font-size: 0.875rem; font-weight: 600;">Character Counter</h4>
        <rdg-input
          placeholder="Type something..."
          label="Message"
          helper-text="0/100 characters"
          @input-change="${(e: CustomEvent) => {
            const input = e.target as any;
            const length = e.detail.value.length;
            const maxLength = 100;
            input.setAttribute('helper-text', `${length}/${maxLength} characters`);
            
            if (length > maxLength) {
              input.setAttribute('error-message', `Message is too long (${length - maxLength} characters over limit)`);
            } else {
              input.removeAttribute('error-message');
            }
          }}"
        ></rdg-input>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Examples of handling input events for real-time validation and character counting.',
      },
    },
  },
};
