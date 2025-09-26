
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
      gap: 0.5rem;
      border: none;
      border-radius: 0.375rem;
      font-family: system-ui, -apple-system, sans-serif;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      position: relative;
      overflow: hidden;
    }

    .button:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
      box-shadow: 0 0 0 2px var(--focus-ring-color, #3b82f6);
    }

    .button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Sizes */
    .small {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .medium {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
    }

    .large {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    /* Variants */
    .primary {
      background-color: #3b82f6;
      color: white;
    }

    .primary:hover:not(:disabled) {
      background-color: #2563eb;
    }

    .primary:active:not(:disabled) {
      background-color: #1d4ed8;
    }

    .secondary {
      background-color: #6b7280;
      color: white;
    }

    .secondary:hover:not(:disabled) {
      background-color: #4b5563;
    }

    .secondary:active:not(:disabled) {
      background-color: #374151;
    }

    .outline {
      background-color: transparent;
      color: #3b82f6;
      border: 1px solid #3b82f6;
    }

    .outline:hover:not(:disabled) {
      background-color: #3b82f6;
      color: white;
    }

    .outline:active:not(:disabled) {
      background-color: #2563eb;
    }

    .ghost {
      background-color: transparent;
      color: #3b82f6;
    }

    .ghost:hover:not(:disabled) {
      background-color: #f3f4f6;
    }

    .ghost:active:not(:disabled) {
      background-color: #e5e7eb;
    }

    .danger {
      background-color: #dc2627;
      color: white;
    }

    .danger:hover:not(:disabled) {
      background-color: #b91c1b;
    }

    .danger:active:not(:disabled) {
      background-color: #991b1b;
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