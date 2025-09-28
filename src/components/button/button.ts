
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

@customElement('rdg-button')
export class RdgButton extends LitElement {
  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: String })
  size: ButtonSize = 'medium';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  loading = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String })
  href?: string;

  @property({ type: String })
  target?: string;

  static styles = css`
    :host {
      display: inline-block;
    }

    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--rdg-space-2);
      border: none;
      border-radius: var(--rdg-radius);
      font-family: var(--rdg-font-family);
      font-weight: var(--rdg-font-weight-medium);
      text-decoration: none;
      cursor: pointer;
      transition: all var(--rdg-transition);
      position: relative;
      overflow: hidden;
    }

    .button:focus {
      outline: 2px solid transparent;
      outline-offset: var(--rdg-focus-ring-offset);
      box-shadow: 0 0 0 2px var(--rdg-focus-ring);
    }

    .button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Sizes */
    .small {
      padding: var(--rdg-space-1) var(--rdg-space-3);
      font-size: var(--rdg-font-size-sm);
      line-height: var(--rdg-line-height-tight);
    }

    .medium {
      padding: var(--rdg-space-2) var(--rdg-space-4);
      font-size: var(--rdg-font-size-sm);
      line-height: var(--rdg-line-height-tight);
    }

    .large {
      padding: var(--rdg-space-3) var(--rdg-space-6);
      font-size: var(--rdg-font-size-base);
      line-height: var(--rdg-line-height-normal);
    }

    /* Variants */
    .primary {
      background-color: var(--rdg-primary);
      color: var(--rdg-text-on-primary);
    }

    .primary:hover:not(:disabled) {
      background-color: var(--rdg-primary-hover);
    }

    .primary:active:not(:disabled) {
      background-color: var(--rdg-primary-active);
    }

    .secondary {
      background-color: var(--rdg-secondary);
      color: var(--rdg-text-on-primary);
    }

    .secondary:hover:not(:disabled) {
      background-color: var(--rdg-secondary-hover);
    }

    .secondary:active:not(:disabled) {
      background-color: var(--rdg-secondary-active);
    }

    .outline {
      background-color: transparent;
      color: var(--rdg-primary);
      border: 1px solid var(--rdg-primary);
    }

    .outline:hover:not(:disabled) {
      background-color: var(--rdg-primary);
      color: var(--rdg-text-on-primary);
    }

    .outline:active:not(:disabled) {
      background-color: var(--rdg-primary-hover);
    }

    .ghost {
      background-color: transparent;
      color: var(--rdg-primary);
    }

    .ghost:hover:not(:disabled) {
      background-color: var(--rdg-surface-hover);
    }

    .ghost:active:not(:disabled) {
      background-color: var(--rdg-surface-active);
    }

    .danger {
      background-color: var(--rdg-error);
      color: var(--rdg-text-on-primary);
    }

    .danger:hover:not(:disabled) {
      background-color: var(--rdg-error-hover);
    }

    .danger:active:not(:disabled) {
      background-color: var(--rdg-error-active);
    }

    /* Loading state */
    .loading {
      color: transparent;
    }

    .spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1rem;
      height: 1rem;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }

    /* Ripple effect */
    .button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }

    .button:active::before {
      width: 300px;
      height: 300px;
    }
  `;

  private _handleClick = (e: Event) => {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Dispatch custom click event
    this.dispatchEvent(new CustomEvent('button-click', {
      detail: { originalEvent: e },
      bubbles: true,
      composed: true
    }));
  };

  render() {
    const classes = {
      button: true,
      [this.variant]: true,
      [this.size]: true,
      loading: this.loading,
    };

    const buttonContent = html`
      <slot></slot>
      ${this.loading ? html`<div class="spinner"></div>` : ''}
    `;

    if (this.href && !this.disabled) {
      return html`
        <a
          href="${this.href}"
          target="${this.target || ''}"
          class="${classMap(classes)}"
          @click="${this._handleClick}"
          aria-disabled="${this.disabled}"
        >
          ${buttonContent}
        </a>
      `;
    }

    return html`
      <button
        type="${this.type}"
        class="${classMap(classes)}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
        aria-disabled="${this.disabled}"
      >
        ${buttonContent}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rdg-button': RdgButton;
  }
}