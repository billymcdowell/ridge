import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { action } from 'storybook/actions';
import './dropdown'; // Import your component
import type { RdgDropdown } from './dropdown';

// Add event listener for the custom dropdown-change event
document.addEventListener('dropdown-change', action('dropdown-change'));

// Sample data for the dropdown
const sampleOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

const countriesOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'cn', label: 'China' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended', disabled: true },
  { value: 'archived', label: 'Archived' },
];

const meta: Meta<RdgDropdown> = {
  title: 'Components/Dropdown',
  component: 'rdg-dropdown',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable dropdown component built with Lit and TypeScript. Supports multiple variants, sizes, search functionality, and keyboard navigation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
      description: 'The visual style variant of the dropdown',
      defaultValue: 'primary',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the dropdown',
      defaultValue: 'medium',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the dropdown is disabled',
      defaultValue: false,
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text when no option is selected',
      defaultValue: 'Select an option...',
    },
    value: {
      control: { type: 'text' },
      description: 'Currently selected value',
      defaultValue: '',
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Whether the dropdown is searchable',
      defaultValue: false,
    },
    searchPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the search input',
      defaultValue: 'Search...',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Whether the dropdown shows a clear button',
      defaultValue: false,
    },
    multiselect: {
      control: { type: 'boolean' },
      description: 'Whether the dropdown allows multiple selections',
      defaultValue: false,
    },
    values: {
      control: { type: 'object' },
      description: 'Array of selected values (for multiselect mode)',
      defaultValue: [],
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    placeholder: 'Select an option...',
    value: '',
    searchable: false,
    searchPlaceholder: 'Search...',
    clearable: false,
    multiselect: false,
    values: [],
  },
};

export default meta;
type Story = StoryObj<RdgDropdown>;

// Default story
export const Default: Story = {
  args: {
    options: sampleOptions,
  },
  render: (args) => html`
    <rdg-dropdown
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      placeholder="${args.placeholder}"
      value="${args.value}"
      .values="${args.values || []}"
      ?multiselect="${args.multiselect}"
      ?searchable="${args.searchable}"
      searchPlaceholder="${args.searchPlaceholder}"
      ?clearable="${args.clearable}"
      .options="${args.options || sampleOptions}"
      @dropdown-change="${(e: CustomEvent) => {
        console.log('Dropdown changed:', e.detail);
      }}"
    ></rdg-dropdown>
  `,
};

// All Variants
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Primary</label>
        <rdg-dropdown
          variant="primary"
          placeholder="Select fruit..."
          .options="${sampleOptions}"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Secondary</label>
        <rdg-dropdown
          variant="secondary"
          placeholder="Select fruit..."
          .options="${sampleOptions}"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Outline</label>
        <rdg-dropdown
          variant="outline"
          placeholder="Select fruit..."
          .options="${sampleOptions}"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available dropdown variants displayed side by side.',
      },
    },
  },
};

// All Sizes
export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Small</label>
        <rdg-dropdown
          size="small"
          placeholder="Select..."
          .options="${sampleOptions.slice(0, 4)}"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Medium</label>
        <rdg-dropdown
          size="medium"
          placeholder="Select option..."
          .options="${sampleOptions.slice(0, 4)}"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Large</label>
        <rdg-dropdown
          size="large"
          placeholder="Select an option..."
          .options="${sampleOptions.slice(0, 4)}"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All available dropdown sizes displayed side by side.',
      },
    },
  },
};

// States
export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Normal</label>
        <rdg-dropdown
          placeholder="Select option..."
          .options="${sampleOptions.slice(0, 4)}"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Disabled</label>
        <rdg-dropdown
          disabled
          placeholder="Select option..."
          .options="${sampleOptions.slice(0, 4)}"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">With Value</label>
        <rdg-dropdown
          value="apple"
          placeholder="Select option..."
          .options="${sampleOptions.slice(0, 4)}"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Clearable</label>
        <rdg-dropdown
          value="banana"
          clearable
          placeholder="Select option..."
          .options="${sampleOptions.slice(0, 4)}"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Different dropdown states including normal, disabled, with value, and clearable.',
      },
    },
  },
};

// Searchable
export const Searchable: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Countries (Searchable)</label>
        <rdg-dropdown
          searchable
          clearable
          placeholder="Select country..."
          searchPlaceholder="Search countries..."
          .options="${countriesOptions}"
          style="min-width: 250px;"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Fruits (Searchable)</label>
        <rdg-dropdown
          searchable
          variant="secondary"
          placeholder="Select fruit..."
          searchPlaceholder="Type to search..."
          .options="${sampleOptions}"
          style="min-width: 200px;"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Searchable dropdowns that filter options as you type.',
      },
    },
  },
};

// With Disabled Options
export const WithDisabledOptions: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Status Selection</label>
        <rdg-dropdown
          placeholder="Select status..."
          .options="${statusOptions}"
          style="min-width: 200px;"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Searchable with Disabled</label>
        <rdg-dropdown
          searchable
          clearable
          variant="outline"
          placeholder="Select status..."
          searchPlaceholder="Search status..."
          .options="${statusOptions}"
          style="min-width: 200px;"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Dropdowns with some disabled options that cannot be selected.',
      },
    },
  },
};

// Size Variant Matrix
export const SizeVariantMatrix: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; align-items: center;">
      <!-- Header -->
      <div style="font-weight: bold; text-align: center;">Size</div>
      <div style="font-weight: bold; text-align: center;">Primary</div>
      <div style="font-weight: bold; text-align: center;">Secondary</div>
      <div style="font-weight: bold; text-align: center;">Outline</div>
      
      <!-- Small row -->
      <div style="font-weight: bold;">Small</div>
      <rdg-dropdown variant="primary" size="small" placeholder="Select..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
      <rdg-dropdown variant="secondary" size="small" placeholder="Select..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
      <rdg-dropdown variant="outline" size="small" placeholder="Select..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
      
      <!-- Medium row -->
      <div style="font-weight: bold;">Medium</div>
      <rdg-dropdown variant="primary" size="medium" placeholder="Select option..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
      <rdg-dropdown variant="secondary" size="medium" placeholder="Select option..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
      <rdg-dropdown variant="outline" size="medium" placeholder="Select option..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
      
      <!-- Large row -->
      <div style="font-weight: bold;">Large</div>
      <rdg-dropdown variant="primary" size="large" placeholder="Select an option..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
      <rdg-dropdown variant="secondary" size="large" placeholder="Select an option..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
      <rdg-dropdown variant="outline" size="large" placeholder="Select an option..." .options="${sampleOptions.slice(0, 3)}"></rdg-dropdown>
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
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Alert on Change</label>
        <rdg-dropdown
          placeholder="Select fruit..."
          .options="${sampleOptions.slice(0, 5)}"
          @dropdown-change="${(e: CustomEvent) => {
            console.log('Dropdown changed:', e.detail);
            alert(`Selected: ${e.detail.option?.label || 'None'} (Value: ${e.detail.value})`);
          }}"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Log to Console</label>
        <rdg-dropdown
          variant="secondary"
          clearable
          placeholder="Select country..."
          .options="${countriesOptions.slice(0, 6)}"
          @dropdown-change="${(e: CustomEvent) => {
            console.log('Country selection changed:', {
              value: e.detail.value,
              option: e.detail.option,
              timestamp: new Date().toISOString()
            });
          }}"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Examples of handling the custom dropdown-change event. Check the console and Actions tab for event details.',
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
    placeholder: 'Select an option...',
    value: '',
    values: [],
    multiselect: false,
    searchable: false,
    searchPlaceholder: 'Search...',
    clearable: false,
    options: sampleOptions,
  },
  render: (args) => html`
    <rdg-dropdown
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
      placeholder="${args.placeholder}"
      value="${args.value}"
      .values="${args.values || []}"
      ?multiselect="${args.multiselect}"
      ?searchable="${args.searchable}"
      searchPlaceholder="${args.searchPlaceholder}"
      ?clearable="${args.clearable}"
      .options="${args.options || sampleOptions}"
      @dropdown-change="${(e: CustomEvent) => {
        console.log('Playground dropdown changed:', e.detail);
      }}"
      style="min-width: 250px;"
    ></rdg-dropdown>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different combinations of props. Use the controls panel to modify the dropdown properties.',
      },
    },
  },
};

// Multiselect Examples
export const Multiselect: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Basic Multiselect</label>
        <rdg-dropdown
          multiselect
          clearable
          placeholder="Select fruits..."
          .values="${['apple', 'banana']}"
          .options="${sampleOptions}"
          style="min-width: 250px;"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Searchable Multiselect</label>
        <rdg-dropdown
          multiselect
          searchable
          clearable
          variant="secondary"
          placeholder="Select countries..."
          searchPlaceholder="Search countries..."
          .values="${['us', 'ca', 'uk']}"
          .options="${countriesOptions}"
          style="min-width: 250px;"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Outline Multiselect</label>
        <rdg-dropdown
          multiselect
          variant="outline"
          size="large"
          placeholder="Select status..."
          .values="${['active', 'pending']}"
          .options="${statusOptions}"
          style="min-width: 200px;"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiselect dropdowns that allow selecting multiple options with checkboxes.',
      },
    },
  },
};

// Multiselect Sizes
export const MultiselectSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Small Multiselect</label>
        <rdg-dropdown
          multiselect
          size="small"
          placeholder="Select..."
          .values="${['apple', 'banana']}"
          .options="${sampleOptions.slice(0, 4)}"
          style="min-width: 180px;"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Medium Multiselect</label>
        <rdg-dropdown
          multiselect
          size="medium"
          placeholder="Select options..."
          .values="${['us', 'ca']}"
          .options="${countriesOptions.slice(0, 5)}"
          style="min-width: 220px;"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Large Multiselect</label>
        <rdg-dropdown
          multiselect
          size="large"
          clearable
          placeholder="Select multiple options..."
          .values="${['active']}"
          .options="${statusOptions}"
          style="min-width: 280px;"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Multiselect dropdowns in different sizes.',
      },
    },
  },
};

// Multiselect Event Handling
export const MultiselectEventHandling: Story = {
  render: () => html`
    <div style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Alert on Change</label>
        <rdg-dropdown
          multiselect
          searchable
          clearable
          placeholder="Select fruits..."
          .options="${sampleOptions}"
          @dropdown-change="${(e: CustomEvent) => {
            console.log('Multiselect changed:', e.detail);
            const { values, options } = e.detail;
            alert(`Selected ${values.length} items: ${options.map((opt: any) => opt.label).join(', ')}`);
          }}"
          style="min-width: 250px;"
        ></rdg-dropdown>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
        <label style="font-weight: bold; font-size: 0.875rem;">Log to Console</label>
        <rdg-dropdown
          multiselect
          variant="outline"
          placeholder="Select countries..."
          .values="${['us', 'ca']}"
          .options="${countriesOptions}"
          @dropdown-change="${(e: CustomEvent) => {
            console.log('Country multiselect changed:', {
              values: e.detail.values,
              options: e.detail.options,
              count: e.detail.values.length,
              timestamp: new Date().toISOString()
            });
          }}"
          style="min-width: 250px;"
        ></rdg-dropdown>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Examples of handling multiselect dropdown-change events. Check the console and Actions tab for event details.',
      },
    },
  },
};

// Real World Examples
export const RealWorldExamples: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 600px;">
      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">User Profile Form</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Country</label>
            <rdg-dropdown
              searchable
              clearable
              placeholder="Select your country..."
              .options="${countriesOptions}"
            ></rdg-dropdown>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Status</label>
            <rdg-dropdown
              variant="secondary"
              placeholder="Select status..."
              value="active"
              .options="${statusOptions}"
            ></rdg-dropdown>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style="margin: 0 0 1rem 0; font-size: 1.125rem; font-weight: 600;">Settings Panel</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Theme Preference</label>
            <rdg-dropdown
              variant="outline"
              size="small"
              placeholder="Choose theme..."
              .options="${[
                { value: 'light', label: '☀️ Light Mode' },
                { value: 'dark', label: '🌙 Dark Mode' },
                { value: 'auto', label: '🔄 Auto (System)' }
              ]}"
            ></rdg-dropdown>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Language</label>
            <rdg-dropdown
              searchable
              size="large"
              placeholder="Select language..."
              .options="${[
                { value: 'en', label: '🇺🇸 English' },
                { value: 'es', label: '🇪🇸 Español' },
                { value: 'fr', label: '🇫🇷 Français' },
                { value: 'de', label: '🇩🇪 Deutsch' },
                { value: 'ja', label: '🇯🇵 日本語' },
                { value: 'zh', label: '🇨🇳 中文' }
              ]}"
            ></rdg-dropdown>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Skills (Multiselect)</label>
            <rdg-dropdown
              multiselect
              searchable
              clearable
              variant="outline"
              placeholder="Select your skills..."
              searchPlaceholder="Search skills..."
              .values="${['javascript', 'typescript']}"
              .options="${[
                { value: 'javascript', label: 'JavaScript' },
                { value: 'typescript', label: 'TypeScript' },
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue.js' },
                { value: 'angular', label: 'Angular' },
                { value: 'node', label: 'Node.js' },
                { value: 'python', label: 'Python' },
                { value: 'java', label: 'Java' },
                { value: 'csharp', label: 'C#' },
                { value: 'go', label: 'Go' }
              ]}"
            ></rdg-dropdown>
          </div>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage examples showing dropdowns in forms and settings panels.',
      },
    },
  },
};
