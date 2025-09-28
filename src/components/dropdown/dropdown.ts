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
      border-radius: var(--rdg-radius);
      font-family: var(--rdg-font-family);
      font-weight: var(--rdg-font-weight-normal);
      text-align: left;
      cursor: pointer;
      transition: all var(--rdg-transition);
      position: relative;
    }

    .dropdown-trigger:focus {
      outline: 2px solid transparent;
      outline-offset: var(--rdg-focus-ring-offset);
      box-shadow: 0 0 0 2px var(--rdg-focus-ring);
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
      color: var(--rdg-text-placeholder);
    }

    .dropdown-value {
      color: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-icon {
      margin-left: var(--rdg-space-2);
      transition: transform var(--rdg-transition);
      flex-shrink: 0;
    }

    .dropdown-icon.open {
      transform: rotate(180deg);
    }

    .clear-button {
      margin-left: var(--rdg-space-1);
      margin-right: var(--rdg-space-1);
      padding: var(--rdg-space-1);
      border: none;
      background: none;
      cursor: pointer;
      border-radius: var(--rdg-radius-sm);
      color: var(--rdg-text-tertiary);
      transition: all var(--rdg-transition);
      flex-shrink: 0;
    }

    .clear-button:hover {
      background-color: var(--rdg-surface-hover);
      color: var(--rdg-text-secondary);
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--rdg-surface);
      border: 1px solid var(--rdg-border-secondary);
      border-radius: var(--rdg-radius);
      box-shadow: var(--rdg-shadow-lg);
      z-index: var(--rdg-z-dropdown);
      max-height: 200px;
      overflow-y: auto;
      margin-top: var(--rdg-space-1);
      display: none;
    }

    .dropdown-menu.open {
      display: block;
    }

    .search-container {
      padding: var(--rdg-space-2);
      border-bottom: 1px solid var(--rdg-border-secondary);
    }

    .search-input {
      width: 100%;
      padding: var(--rdg-space-1) var(--rdg-space-3);
      border: 1px solid var(--rdg-border-primary);
      border-radius: var(--rdg-radius-sm);
      font-size: var(--rdg-font-size-sm);
      outline: none;
      background: var(--rdg-background);
      color: var(--rdg-text-primary);
    }

    .search-input:focus {
      border-color: var(--rdg-border-focus);
      box-shadow: 0 0 0 1px var(--rdg-border-focus);
    }

    .dropdown-option {
      display: block;
      width: 100%;
      padding: var(--rdg-space-3);
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
      transition: background-color var(--rdg-transition);
      font-family: inherit;
      font-size: inherit;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--rdg-text-primary);
    }

    .dropdown-option:hover:not(:disabled),
    .dropdown-option.highlighted {
      background-color: var(--rdg-surface-hover);
    }

    .dropdown-option:disabled {
      cursor: not-allowed;
      opacity: 0.5;
      background-color: transparent;
      color: var(--rdg-text-disabled);
    }

    .dropdown-option.selected {
      background-color: var(--rdg-primary-light);
      color: var(--rdg-primary);
      font-weight: var(--rdg-font-weight-medium);
    }

    .option-content {
      display: flex;
      align-items: center;
      gap: var(--rdg-space-2);
      width: 100%;
    }

    .option-checkbox {
      width: 1rem;
      height: 1rem;
      border: 2px solid var(--rdg-border-primary);
      border-radius: var(--rdg-radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all var(--rdg-transition);
    }

    .option-checkbox.checked {
      background-color: var(--rdg-primary);
      border-color: var(--rdg-primary);
      color: var(--rdg-text-on-primary);
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
      background-color: var(--rdg-primary);
      color: var(--rdg-text-on-primary);
      border-radius: var(--rdg-radius-full);
      padding: var(--rdg-space-1) var(--rdg-space-2);
      font-size: var(--rdg-font-size-xs);
      font-weight: var(--rdg-font-weight-medium);
      margin-left: var(--rdg-space-2);
      flex-shrink: 0;
    }

    .no-options {
      padding: var(--rdg-space-3);
      text-align: center;
      color: var(--rdg-text-tertiary);
      font-style: italic;
    }

    /* Sizes */
    .small .dropdown-trigger {
      padding: var(--rdg-space-1) var(--rdg-space-3);
      font-size: var(--rdg-font-size-sm);
      line-height: var(--rdg-line-height-tight);
    }

    .small .dropdown-option {
      padding: var(--rdg-space-2) var(--rdg-space-3);
      font-size: var(--rdg-font-size-sm);
    }

    .medium .dropdown-trigger {
      padding: var(--rdg-space-2) var(--rdg-space-4);
      font-size: var(--rdg-font-size-sm);
      line-height: var(--rdg-line-height-tight);
    }

    .medium .dropdown-option {
      padding: var(--rdg-space-3) var(--rdg-space-4);
      font-size: var(--rdg-font-size-sm);
    }

    .large .dropdown-trigger {
      padding: var(--rdg-space-3) var(--rdg-space-6);
      font-size: var(--rdg-font-size-base);
      line-height: var(--rdg-line-height-normal);
    }

    .large .dropdown-option {
      padding: var(--rdg-space-4) var(--rdg-space-6);
      font-size: var(--rdg-font-size-base);
    }

    /* Variants */
    .primary .dropdown-trigger {
      background-color: var(--rdg-background);
      color: var(--rdg-text-secondary);
      border: 1px solid var(--rdg-border-primary);
    }

    .primary .dropdown-trigger:hover:not(:disabled) {
      border-color: var(--rdg-border-hover);
    }

    .primary .dropdown-trigger:focus {
      border-color: var(--rdg-border-focus);
    }

    .secondary .dropdown-trigger {
      background-color: var(--rdg-surface-variant);
      color: var(--rdg-text-secondary);
      border: 1px solid var(--rdg-border-secondary);
    }

    .secondary .dropdown-trigger:hover:not(:disabled) {
      background-color: var(--rdg-surface-hover);
      border-color: var(--rdg-border-primary);
    }

    .secondary .dropdown-trigger:focus {
      border-color: var(--rdg-border-focus);
      background-color: var(--rdg-background);
    }

    .outline .dropdown-trigger {
      background-color: transparent;
      color: var(--rdg-primary);
      border: 2px solid var(--rdg-primary);
    }

    .outline .dropdown-trigger:hover:not(:disabled) {
      background-color: var(--rdg-primary-lighter);
    }

    .outline .dropdown-trigger:focus {
      background-color: var(--rdg-primary-lighter);
    }

    .outline .dropdown-placeholder {
      color: var(--rdg-primary-400);
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
      animation: fadeIn var(--rdg-transition) ease-out;
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
