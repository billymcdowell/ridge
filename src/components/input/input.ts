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
      font-family: var(--rdg-font-family);
      font-weight: var(--rdg-font-weight-medium);
      margin-bottom: var(--rdg-space-1);
      color: var(--rdg-text-secondary);
    }

    .label.required::after {
      content: ' *';
      color: var(--rdg-error);
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
      font-family: var(--rdg-font-family);
      transition: all var(--rdg-transition);
      background: transparent;
      color: var(--rdg-text-primary);
    }

    .input::placeholder {
      color: var(--rdg-text-placeholder);
    }

    .input:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      color: var(--rdg-text-disabled);
    }

    .input:disabled::placeholder {
      color: var(--rdg-text-disabled);
    }

    /* Leading Icon */
    .leading-icon {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      color: var(--rdg-text-tertiary);
      pointer-events: none;
      z-index: 1;
    }

    /* Trailing Icon */
    .trailing-icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      color: var(--rdg-text-tertiary);
      cursor: pointer;
      z-index: 1;
    }

    .trailing-icon.password-toggle {
      cursor: pointer;
    }

    .trailing-icon.password-toggle:hover {
      color: var(--rdg-text-secondary);
    }

    /* Sizes */
    .small .input {
      padding: var(--rdg-space-1) var(--rdg-space-3);
      font-size: var(--rdg-font-size-sm);
      line-height: var(--rdg-line-height-tight);
    }

    .small .input.has-leading-icon {
      padding-left: var(--rdg-space-8);
    }

    .small .input.has-trailing-icon {
      padding-right: var(--rdg-space-8);
    }

    .small .leading-icon {
      left: var(--rdg-space-2);
      width: 1rem;
      height: 1rem;
    }

    .small .trailing-icon {
      right: var(--rdg-space-2);
      width: 1rem;
      height: 1rem;
    }

    .medium .input {
      padding: var(--rdg-space-2) var(--rdg-space-4);
      font-size: var(--rdg-font-size-sm);
      line-height: var(--rdg-line-height-tight);
    }

    .medium .input.has-leading-icon {
      padding-left: var(--rdg-space-10);
    }

    .medium .input.has-trailing-icon {
      padding-right: var(--rdg-space-10);
    }

    .medium .leading-icon {
      left: var(--rdg-space-3);
      width: 1.125rem;
      height: 1.125rem;
    }

    .medium .trailing-icon {
      right: var(--rdg-space-3);
      width: 1.125rem;
      height: 1.125rem;
    }

    .large .input {
      padding: var(--rdg-space-3) var(--rdg-space-5);
      font-size: var(--rdg-font-size-base);
      line-height: var(--rdg-line-height-normal);
    }

    .large .input.has-leading-icon {
      padding-left: var(--rdg-space-12);
    }

    .large .input.has-trailing-icon {
      padding-right: var(--rdg-space-12);
    }

    .large .leading-icon {
      left: var(--rdg-space-4);
      width: 1.25rem;
      height: 1.25rem;
    }

    .large .trailing-icon {
      right: var(--rdg-space-4);
      width: 1.25rem;
      height: 1.25rem;
    }

    /* Outlined Variant */
    .outlined .input-wrapper {
      border: 1px solid var(--rdg-border-primary);
      border-radius: var(--rdg-radius);
      background-color: var(--rdg-background);
    }

    .outlined .input-wrapper:hover:not(.disabled) {
      border-color: var(--rdg-border-hover);
    }

    .outlined .input-wrapper.focused {
      border-color: var(--rdg-border-focus);
      box-shadow: 0 0 0 1px var(--rdg-border-focus);
    }

    .outlined .input-wrapper.error {
      border-color: var(--rdg-border-error);
      box-shadow: 0 0 0 1px var(--rdg-border-error);
    }

    .outlined .input-wrapper.disabled {
      background-color: var(--rdg-surface-disabled);
      border-color: var(--rdg-border-disabled);
    }

    /* Filled Variant */
    .filled .input-wrapper {
      border: 1px solid transparent;
      border-radius: var(--rdg-radius);
      background-color: var(--rdg-surface-variant);
    }

    .filled .input-wrapper:hover:not(.disabled) {
      background-color: var(--rdg-surface-hover);
    }

    .filled .input-wrapper.focused {
      background-color: var(--rdg-background);
      border-color: var(--rdg-border-focus);
      box-shadow: 0 0 0 1px var(--rdg-border-focus);
    }

    .filled .input-wrapper.error {
      background-color: var(--rdg-error-lighter);
      border-color: var(--rdg-border-error);
      box-shadow: 0 0 0 1px var(--rdg-border-error);
    }

    .filled .input-wrapper.disabled {
      background-color: var(--rdg-surface-disabled);
      border-color: var(--rdg-border-disabled);
    }

    /* Plain Variant */
    .plain .input-wrapper {
      border: none;
      border-bottom: 1px solid var(--rdg-border-primary);
      border-radius: 0;
      background-color: transparent;
    }

    .plain .input-wrapper:hover:not(.disabled) {
      border-bottom-color: var(--rdg-border-hover);
    }

    .plain .input-wrapper.focused {
      border-bottom-color: var(--rdg-border-focus);
      box-shadow: 0 1px 0 0 var(--rdg-border-focus);
    }

    .plain .input-wrapper.error {
      border-bottom-color: var(--rdg-border-error);
      box-shadow: 0 1px 0 0 var(--rdg-border-error);
    }

    .plain .input-wrapper.disabled {
      border-bottom-color: var(--rdg-border-disabled);
    }

    /* Helper Text */
    .helper-text {
      margin-top: var(--rdg-space-1);
      font-size: var(--rdg-font-size-xs);
      line-height: 1rem;
      color: var(--rdg-text-tertiary);
    }

    .helper-text.error {
      color: var(--rdg-error);
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
      color: var(--rdg-text-secondary);
    }

    .password-toggle:focus {
      outline: 2px solid transparent;
      outline-offset: var(--rdg-focus-ring-offset);
      box-shadow: 0 0 0 2px var(--rdg-focus-ring);
      border-radius: var(--rdg-radius-sm);
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
