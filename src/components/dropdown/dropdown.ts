import { LitElement, html, css } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

export type DropdownVariant = 'primary' | 'secondary' | 'outline';
export type DropdownSize = 'small' | 'medium' | 'large';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement('rdg-dropdown')
export class RdgDropdown extends LitElement {
  @property({ type: String })
  variant: DropdownVariant = 'primary';

  @property({ type: String })
  size: DropdownSize = 'medium';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  placeholder = 'Select an option...';

  @property({ type: String })
  value = '';

  @property({ type: Array })
  values: string[] = [];

  @property({ type: Array })
  options: DropdownOption[] = [];

  @property({ type: Boolean })
  multiselect = false;

  @property({ type: Boolean })
  searchable = false;

  @property({ type: String })
  searchPlaceholder = 'Search...';

  @property({ type: Boolean })
  clearable = false;

  @state()
  private _isOpen = false;

  @state()
  private _searchTerm = '';

  @state()
  private _highlightedIndex = -1;

  @query('.dropdown-trigger')
  private _trigger!: HTMLElement;

  @query('.search-input')
  private _searchInput?: HTMLInputElement;

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      min-width: 200px;
    }

    .dropdown {
      position: relative;
      width: 100%;
    }

    .dropdown-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      border: none;
      border-radius: 0.375rem;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 400;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      position: relative;
    }

    .dropdown-trigger:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
      box-shadow: 0 0 0 2px var(--focus-ring-color, #3b82f6);
    }

    .dropdown-trigger:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .dropdown-content {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
    }

    .dropdown-placeholder {
      color: #9ca3af;
    }

    .dropdown-value {
      color: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-icon {
      margin-left: 0.5rem;
      transition: transform 0.2s ease-in-out;
      flex-shrink: 0;
    }

    .dropdown-icon.open {
      transform: rotate(180deg);
    }

    .clear-button {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
      padding: 0.125rem;
      border: none;
      background: none;
      cursor: pointer;
      border-radius: 0.25rem;
      color: #6b7280;
      transition: all 0.2s ease-in-out;
      flex-shrink: 0;
    }

    .clear-button:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: #374151;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      z-index: 50;
      max-height: 200px;
      overflow-y: auto;
      margin-top: 0.25rem;
      display: none;
    }

    .dropdown-menu.open {
      display: block;
    }

    .search-container {
      padding: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .search-input {
      width: 100%;
      padding: 0.375rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      outline: none;
    }

    .search-input:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }

    .dropdown-option {
      display: block;
      width: 100%;
      padding: 0.75rem;
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
      font-family: inherit;
      font-size: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-option:hover:not(:disabled),
    .dropdown-option.highlighted {
      background-color: #f3f4f6;
    }

    .dropdown-option:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: transparent;
    }

    .dropdown-option.selected {
      background-color: #dbeafe;
      color: #1e40af;
      font-weight: 500;
    }

    .option-content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
    }

    .option-checkbox {
      width: 1rem;
      height: 1rem;
      border: 2px solid #d1d5db;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 0.2s ease-in-out;
    }

    .option-checkbox.checked {
      background-color: #3b82f6;
      border-color: #3b82f6;
      color: white;
    }

    .option-checkbox svg {
      width: 0.75rem;
      height: 0.75rem;
    }

    .option-label {
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .selected-count {
      background-color: #3b82f6;
      color: white;
      border-radius: 9999px;
      padding: 0.125rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      margin-left: 0.5rem;
      flex-shrink: 0;
    }

    .no-options {
      padding: 0.75rem;
      text-align: center;
      color: #6b7280;
      font-style: italic;
    }

    /* Sizes */
    .small .dropdown-trigger {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .small .dropdown-option {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
    }

    .medium .dropdown-trigger {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .medium .dropdown-option {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
    }

    .large .dropdown-trigger {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .large .dropdown-option {
      padding: 1rem 1.5rem;
      font-size: 1rem;
    }

    /* Variants */
    .primary .dropdown-trigger {
      background-color: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .primary .dropdown-trigger:hover:not(:disabled) {
      border-color: #9ca3af;
    }

    .primary .dropdown-trigger:focus {
      border-color: #3b82f6;
    }

    .secondary .dropdown-trigger {
      background-color: #f9fafb;
      color: #374151;
      border: 1px solid #e5e7eb;
    }

    .secondary .dropdown-trigger:hover:not(:disabled) {
      background-color: #f3f4f6;
      border-color: #d1d5db;
    }

    .secondary .dropdown-trigger:focus {
      border-color: #3b82f6;
      background-color: white;
    }

    .outline .dropdown-trigger {
      background-color: transparent;
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }

    .outline .dropdown-trigger:hover:not(:disabled) {
      background-color: #f0f9ff;
    }

    .outline .dropdown-trigger:focus {
      background-color: #f0f9ff;
    }

    .outline .dropdown-placeholder {
      color: #60a5fa;
    }

    /* Animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown-menu.open {
      animation: fadeIn 0.2s ease-out;
    }
  `;

  private get _filteredOptions() {
    if (!this.searchable || !this._searchTerm) {
      return this.options;
    }
    
    return this.options.filter(option =>
      option.label.toLowerCase().includes(this._searchTerm.toLowerCase())
    );
  }

  private get _selectedOption() {
    return this.options.find(option => option.value === this.value);
  }

  private get _selectedOptions() {
    return this.options.filter(option => this.values.includes(option.value));
  }

  private get _currentValues() {
    return this.multiselect ? this.values : (this.value ? [this.value] : []);
  }

  private _handleTriggerClick = (e: Event) => {
    e.preventDefault();
    if (this.disabled) return;
    
    this._toggleDropdown();
  };

  private _handleTriggerKeydown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this._toggleDropdown();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!this._isOpen) {
          this._openDropdown();
        } else {
          this._navigateOptions(1);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (this._isOpen) {
          this._navigateOptions(-1);
        }
        break;
      case 'Escape':
        if (this._isOpen) {
          this._closeDropdown();
        }
        break;
    }
  };

  private _handleOptionClick = (option: DropdownOption, e: Event) => {
    e.preventDefault();
    if (option.disabled) return;
    
    if (this.multiselect) {
      this._toggleOption(option);
    } else {
      this._selectOption(option);
    }
  };

  private _handleSearchInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this._searchTerm = target.value;
    this._highlightedIndex = -1;
  };

  private _handleSearchKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._navigateOptions(1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._navigateOptions(-1);
        break;
      case 'Enter':
        e.preventDefault();
        if (this._highlightedIndex >= 0) {
          const option = this._filteredOptions[this._highlightedIndex];
          if (option && !option.disabled) {
            this._selectOption(option);
          }
        }
        break;
      case 'Escape':
        this._closeDropdown();
        break;
    }
  };

  private _handleClear = (e: Event) => {
    e.stopPropagation();
    if (this.multiselect) {
      this.values = [];
    } else {
      this.value = '';
    }
    this._dispatchChange();
  };

  private _toggleDropdown() {
    if (this._isOpen) {
      this._closeDropdown();
    } else {
      this._openDropdown();
    }
  }

  private _openDropdown() {
    this._isOpen = true;
    this._searchTerm = '';
    this._highlightedIndex = -1;
    
    // Focus search input if searchable
    this.updateComplete.then(() => {
      if (this.searchable && this._searchInput) {
        this._searchInput.focus();
      }
    });

    // Add click outside listener
    setTimeout(() => {
      document.addEventListener('click', this._handleClickOutside);
    }, 0);
  }

  private _closeDropdown() {
    this._isOpen = false;
    this._searchTerm = '';
    this._highlightedIndex = -1;
    document.removeEventListener('click', this._handleClickOutside);
    this._trigger.focus();
  }

  private _handleClickOutside = (e: Event) => {
    if (!this.contains(e.target as Node)) {
      this._closeDropdown();
    }
  };

  private _navigateOptions(direction: number) {
    const options = this._filteredOptions.filter(option => !option.disabled);
    if (options.length === 0) return;

    let newIndex = this._highlightedIndex + direction;
    
    if (newIndex < 0) {
      newIndex = options.length - 1;
    } else if (newIndex >= options.length) {
      newIndex = 0;
    }
    
    // Find the actual index in filtered options
    const targetOption = options[newIndex];
    this._highlightedIndex = this._filteredOptions.findIndex(
      option => option === targetOption
    );
  }

  private _selectOption(option: DropdownOption) {
    this.value = option.value;
    this._closeDropdown();
    this._dispatchChange();
  }

  private _toggleOption(option: DropdownOption) {
    const currentValues = [...this.values];
    const index = currentValues.indexOf(option.value);
    
    if (index > -1) {
      currentValues.splice(index, 1);
    } else {
      currentValues.push(option.value);
    }
    
    this.values = currentValues;
    this._dispatchChange();
  }

  private _dispatchChange() {
    if (this.multiselect) {
      const selectedOptions = this._selectedOptions;
      this.dispatchEvent(new CustomEvent('dropdown-change', {
        detail: { 
          values: this.values, 
          options: selectedOptions 
        },
        bubbles: true,
        composed: true
      }));
    } else {
      const selectedOption = this._selectedOption;
      this.dispatchEvent(new CustomEvent('dropdown-change', {
        detail: { 
          value: this.value, 
          option: selectedOption 
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleClickOutside);
  }

  render() {
    const dropdownClasses = {
      dropdown: true,
      [this.variant]: true,
      [this.size]: true,
    };

    const iconClasses = {
      'dropdown-icon': true,
      'open': this._isOpen,
    };

    const menuClasses = {
      'dropdown-menu': true,
      'open': this._isOpen,
    };

    const selectedOption = this._selectedOption;
    const selectedOptions = this._selectedOptions;
    const filteredOptions = this._filteredOptions;
    const currentValues = this._currentValues;

    return html`
      <div class="${classMap(dropdownClasses)}">
        <button
          class="dropdown-trigger"
          ?disabled="${this.disabled}"
          @click="${this._handleTriggerClick}"
          @keydown="${this._handleTriggerKeydown}"
          aria-haspopup="listbox"
          aria-expanded="${this._isOpen}"
          aria-label="${this.multiselect 
            ? `${selectedOptions.length} items selected`
            : selectedOption ? selectedOption.label : this.placeholder}"
        >
          <div class="dropdown-content">
            ${this.multiselect ? html`
              ${selectedOptions.length > 0 
                ? html`
                  <span class="dropdown-value">
                    ${selectedOptions.length === 1 
                      ? selectedOptions[0].label 
                      : `${selectedOptions.length} items selected`
                    }
                  </span>
                  ${selectedOptions.length > 1 ? html`
                    <span class="selected-count">${selectedOptions.length}</span>
                  ` : ''}
                `
                : html`<span class="dropdown-placeholder">${this.placeholder}</span>`
              }
            ` : html`
              ${selectedOption 
                ? html`<span class="dropdown-value">${selectedOption.label}</span>`
                : html`<span class="dropdown-placeholder">${this.placeholder}</span>`
              }
            `}
          </div>
          
          ${this.clearable && currentValues.length > 0 ? html`
            <button
              class="clear-button"
              @click="${this._handleClear}"
              aria-label="Clear selection"
              tabindex="-1"
            >
              ✕
            </button>
          ` : ''}
          
          <svg class="${classMap(iconClasses)}" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="${classMap(menuClasses)}" role="listbox">
          ${this.searchable ? html`
            <div class="search-container">
              <input
                class="search-input"
                type="text"
                placeholder="${this.searchPlaceholder}"
                .value="${this._searchTerm}"
                @input="${this._handleSearchInput}"
                @keydown="${this._handleSearchKeydown}"
              />
            </div>
          ` : ''}

          ${filteredOptions.length > 0 ? repeat(
            filteredOptions,
            (option) => option.value,
            (option, index) => {
              const isSelected = this.multiselect 
                ? this.values.includes(option.value)
                : option.value === this.value;
              
              const optionClasses = {
                'dropdown-option': true,
                'selected': isSelected && !this.multiselect,
                'highlighted': index === this._highlightedIndex,
              };

              const checkboxClasses = {
                'option-checkbox': true,
                'checked': isSelected,
              };

              return html`
                <button
                  class="${classMap(optionClasses)}"
                  ?disabled="${option.disabled}"
                  @click="${(e: Event) => this._handleOptionClick(option, e)}"
                  role="option"
                  aria-selected="${isSelected}"
                >
                  ${this.multiselect ? html`
                    <div class="option-content">
                      <div class="${classMap(checkboxClasses)}">
                        ${isSelected ? html`
                          <svg viewBox="0 0 16 16" fill="currentColor">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                          </svg>
                        ` : ''}
                      </div>
                      <span class="option-label">${option.label}</span>
                    </div>
                  ` : html`
                    ${option.label}
                  `}
                </button>
              `;
            }
          ) : html`
            <div class="no-options">
              ${this.searchable && this._searchTerm ? 'No matching options' : 'No options available'}
            </div>
          `}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rdg-dropdown': RdgDropdown;
  }
}
