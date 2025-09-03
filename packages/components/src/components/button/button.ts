import { html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseElement } from '../base/base-element.js';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@customElement('my-button')
export class Button extends BaseElement {
  @property({ type: String })
  variant: ButtonVariant = 'primary';

  @property({ type: String })
  size: ButtonSize = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String })
  href?: string;

  @property({ type: String })
  target?: string;

  static styles: CSSResultGroup = [
    BaseElement.styles,
    css`
      :host {
        display: inline-block;
        --button-padding-x: var(--spacing-4, 1rem);
        --button-padding-y: var(--spacing-2, 0.5rem);
        --button-border-radius: 0.375rem;
        --button-font-weight: var(--typography-font-weights-medium, 500);
        --button-transition: all 0.2s ease-in-out;
      }

      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-2, 0.5rem);
        padding: var(--button-padding-y) var(--button-padding-x);
        border: 1px solid transparent;
        border-radius: var(--button-border-radius);
        font-family: inherit;
        font-weight: var(--button-font-weight);
        font-size: var(--typography-font-sizes-sm, 0.875rem);
        line-height: var(--typography-line-heights-normal, 1.5);
        text-decoration: none;
        cursor: pointer;
        transition: var(--button-transition);
        user-select: none;
        white-space: nowrap;
      }

      .button:focus-visible {
        outline: 2px solid var(--color-semantic-border-focus, #0ea5e9);
        outline-offset: 2px;
      }

      /* Variants */
      .button--primary {
        background-color: var(--color-semantic-interactive-primary-default, #0284c7);
        color: white;
      }

      .button--primary:hover:not(:disabled) {
        background-color: var(--color-semantic-interactive-primary-hover, #0369a1);
      }

      .button--primary:active {
        background-color: var(--color-semantic-interactive-primary-active, #075985);
      }

      .button--secondary {
        background-color: var(--color-semantic-background-secondary, #f5f5f5);
        color: var(--color-semantic-text-primary);
        border-color: var(--color-semantic-border-primary);
      }

      .button--secondary:hover:not(:disabled) {
        background-color: var(--color-semantic-background-tertiary, #e5e5e5);
      }

      .button--outline {
        background-color: transparent;
        color: var(--color-semantic-interactive-primary-default, #0284c7);
        border-color: var(--color-semantic-interactive-primary-default, #0284c7);
      }

      .button--outline:hover:not(:disabled) {
        background-color: var(--color-semantic-interactive-primary-default, #0284c7);
        color: white;
      }

      .button--ghost {
        background-color: transparent;
        color: var(--color-semantic-interactive-primary-default, #0284c7);
      }

      .button--ghost:hover:not(:disabled) {
        background-color: var(--color-semantic-background-secondary, #f5f5f5);
      }

      /* Sizes */
      .button--sm {
        --button-padding-x: var(--spacing-3, 0.75rem);
        --button-padding-y: var(--spacing-1, 0.25rem);
        font-size: var(--typography-font-sizes-xs, 0.75rem);
      }

      .button--lg {
        --button-padding-x: var(--spacing-6, 1.5rem);
        --button-padding-y: var(--spacing-3, 0.75rem);
        font-size: var(--typography-font-sizes-base, 1rem);
      }

      /* States */
      .button:disabled,
      .button--loading {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .loading-spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `
  ];

  private _handleClick(event: Event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    // Dispatch custom event
    this.dispatchEvent(new CustomEvent('my-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }

  render(): TemplateResult {
    const classes = {
      button: true,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
      'button--loading': this.loading
    };

    const content = html`
      ${this.loading ? html`<span class="loading-spinner"></span>` : ''}
      <slot></slot>
    `;

    if (this.href && !this.disabled) {
      return html`
        <a
          href="${this.href}"
          target="${this.target ?? ''}"
          class="${classMap(classes)}"
          @click="${this._handleClick}"
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        type="button"
        class="${classMap(classes)}"
        ?disabled="${this.disabled || this.loading}"
        @click="${this._handleClick}"
      >
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-button': Button;
  }
}