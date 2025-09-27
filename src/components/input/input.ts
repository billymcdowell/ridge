import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type InputVariant = 'outlined' | 'filled' | 'plain';
export type InputSize = 'small' | 'medium' | 'large';
export type InputType = 'text' | 'password' | 'email';

@customElement('rdg-input')
export class RdgInput extends LitElement {
  @property({ type: String })
  variant: InputVariant = 'outlined';

  @property({ type: String })
  size: InputSize = 'medium';

  @property({ type: String })
  type: InputType = 'text';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  name = '';

  @property({ type: String })
  id = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: String })
  autocomplete = '';

  @property({ type: String, attribute: 'leading-icon' })
  leadingIcon = '';

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon = '';

  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  @state()
  private _focused = false;

  @state()
  private _showPassword = false;

  static styles = css`
    :host {
      display: inline-block;
      width: 100%;
      max-width: 320px;
    }

    .input-container {
      position: relative;
      width: 100%;
    }

    .label {
      display: block;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 500;
      margin-bottom: 0.375rem;
      color: #374151;
    }

    .label.required::after {
      content: ' *';
      color: #dc2626;
    }

    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
    }

    .input {
      width: 100%;
      border: none;
      outline: none;
      font-family: system-ui, -apple-system, sans-serif;
      transition: all 0.2s ease-in-out;
      background: transparent;
      color: #111827;
    }

    .input::placeholder {
      color: #9ca3af;
    }

    .input:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      color: #6b7280;
    }

    .input:disabled::placeholder {
      color: #d1d5db;
    }

    /* Leading Icon */
    .leading-icon {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      pointer-events: none;
      z-index: 1;
    }

    /* Trailing Icon */
    .trailing-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
      cursor: pointer;
      z-index: 1;
    }

    .trailing-icon.password-toggle {
      cursor: pointer;
    }

    .trailing-icon.password-toggle:hover {
      color: #374151;
    }

    /* Sizes */
    .small .input {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .small .input.has-leading-icon {
      padding-left: 2rem;
    }

    .small .input.has-trailing-icon {
      padding-right: 2rem;
    }

    .small .leading-icon {
      left: 0.5rem;
      width: 1rem;
      height: 1rem;
    }

    .small .trailing-icon {
      right: 0.5rem;
      width: 1rem;
      height: 1rem;
    }

    .medium .input {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .medium .input.has-leading-icon {
      padding-left: 2.5rem;
    }

    .medium .input.has-trailing-icon {
      padding-right: 2.5rem;
    }

    .medium .leading-icon {
      left: 0.75rem;
      width: 1.125rem;
      height: 1.125rem;
    }

    .medium .trailing-icon {
      right: 0.75rem;
      width: 1.125rem;
      height: 1.125rem;
    }

    .large .input {
      padding: 0.75rem 1.25rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .large .input.has-leading-icon {
      padding-left: 3rem;
    }

    .large .input.has-trailing-icon {
      padding-right: 3rem;
    }

    .large .leading-icon {
      left: 1rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    .large .trailing-icon {
      right: 1rem;
      width: 1.25rem;
      height: 1.25rem;
    }

    /* Outlined Variant */
    .outlined .input-wrapper {
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background-color: #ffffff;
    }

    .outlined .input-wrapper:hover:not(.disabled) {
      border-color: #9ca3af;
    }

    .outlined .input-wrapper.focused {
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }

    .outlined .input-wrapper.error {
      border-color: #dc2626;
      box-shadow: 0 0 0 1px #dc2626;
    }

    .outlined .input-wrapper.disabled {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }

    /* Filled Variant */
    .filled .input-wrapper {
      border: 1px solid transparent;
      border-radius: 0.375rem;
      background-color: #f3f4f6;
    }

    .filled .input-wrapper:hover:not(.disabled) {
      background-color: #e5e7eb;
    }

    .filled .input-wrapper.focused {
      background-color: #ffffff;
      border-color: #3b82f6;
      box-shadow: 0 0 0 1px #3b82f6;
    }

    .filled .input-wrapper.error {
      background-color: #fef2f2;
      border-color: #dc2626;
      box-shadow: 0 0 0 1px #dc2626;
    }

    .filled .input-wrapper.disabled {
      background-color: #f9fafb;
      border-color: #e5e7eb;
    }

    /* Plain Variant */
    .plain .input-wrapper {
      border: none;
      border-bottom: 1px solid #d1d5db;
      border-radius: 0;
      background-color: transparent;
    }

    .plain .input-wrapper:hover:not(.disabled) {
      border-bottom-color: #9ca3af;
    }

    .plain .input-wrapper.focused {
      border-bottom-color: #3b82f6;
      box-shadow: 0 1px 0 0 #3b82f6;
    }

    .plain .input-wrapper.error {
      border-bottom-color: #dc2626;
      box-shadow: 0 1px 0 0 #dc2626;
    }

    .plain .input-wrapper.disabled {
      border-bottom-color: #e5e7eb;
    }

    /* Helper Text */
    .helper-text {
      margin-top: 0.375rem;
      font-size: 0.75rem;
      line-height: 1rem;
      color: #6b7280;
    }

    .helper-text.error {
      color: #dc2626;
    }

    /* Focus styles */
    .input:focus {
      outline: none;
    }

    /* Icons */
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Password visibility toggle */
    .password-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .password-toggle:hover {
      color: #374151;
    }

    .password-toggle:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
      box-shadow: 0 0 0 2px #3b82f6;
      border-radius: 2px;
    }
  `;

  private _handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    
    this.dispatchEvent(new CustomEvent('input-change', {
      detail: { 
        value: this.value, 
        originalEvent: e 
      },
      bubbles: true,
      composed: true
    }));
  };

  private _handleFocus = (e: Event) => {
    this._focused = true;
    
    this.dispatchEvent(new CustomEvent('input-focus', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  };

  private _handleBlur = (e: Event) => {
    this._focused = false;
    
    this.dispatchEvent(new CustomEvent('input-blur', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  };

  private _togglePasswordVisibility = () => {
    this._showPassword = !this._showPassword;
  };

  private _renderIcon(icon: string, className: string) {
    if (!icon) return '';
    
    // Simple emoji/text icon support
    if (icon.length <= 2) {
      return html`<span class="${className} icon">${icon}</span>`;
    }
    
    // SVG or HTML icon support
    return html`<span class="${className} icon" .innerHTML="${icon}"></span>`;
  }

  private _renderPasswordToggle() {
    if (this.type !== 'password') return '';
    
    const eyeIcon = this._showPassword ? '🙈' : '👁️';
    
    return html`
      <button
        type="button"
        class="trailing-icon password-toggle icon"
        @click="${this._togglePasswordVisibility}"
        aria-label="${this._showPassword ? 'Hide password' : 'Show password'}"
        tabindex="-1"
      >
        ${eyeIcon}
      </button>
    `;
  }

  render() {
    const containerClasses = {
      'input-container': true,
      [this.variant]: true,
      [this.size]: true,
    };

    const wrapperClasses = {
      'input-wrapper': true,
      focused: this._focused,
      disabled: this.disabled,
      error: !!this.errorMessage,
    };

    const inputClasses = {
      input: true,
      'has-leading-icon': !!this.leadingIcon,
      'has-trailing-icon': !!this.trailingIcon || this.type === 'password',
    };

    const inputType = this.type === 'password' && this._showPassword ? 'text' : this.type;

    return html`
      <div class="${classMap(containerClasses)}">
        ${this.label ? html`
          <label 
            class="${classMap({ label: true, required: this.required })}"
            for="${this.id || this.name}"
          >
            ${this.label}
          </label>
        ` : ''}
        
        <div class="${classMap(wrapperClasses)}">
          ${this._renderIcon(this.leadingIcon, 'leading-icon')}
          
          <input
            class="${classMap(inputClasses)}"
            type="${inputType}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            name="${ifDefined(this.name || undefined)}"
            id="${ifDefined(this.id || this.name || undefined)}"
            ?disabled="${this.disabled}"
            ?required="${this.required}"
            ?readonly="${this.readonly}"
            autocomplete="${ifDefined(this.autocomplete || undefined)}"
            @input="${this._handleInput}"
            @focus="${this._handleFocus}"
            @blur="${this._handleBlur}"
          />
          
          ${this.type === 'password' ? this._renderPasswordToggle() : this._renderIcon(this.trailingIcon, 'trailing-icon')}
        </div>
        
        ${this.errorMessage || this.helperText ? html`
          <div class="${classMap({ 'helper-text': true, error: !!this.errorMessage })}">
            ${this.errorMessage || this.helperText}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rdg-input': RdgInput;
  }
}
