import { LitElement, css, CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';

export abstract class BaseElement extends LitElement {
  @property({ type: String, reflect: true })
  theme: 'light' | 'dark' | 'auto' = 'auto';

  static styles: CSSResultGroup = css`
    :host {
      --color-text-primary: var(--color-semantic-text-primary, #171717);
      --color-text-secondary: var(--color-semantic-text-secondary, #525252);
      --color-background-primary: var(--color-semantic-background-primary, #fafafa);
      --color-border-primary: var(--color-semantic-border-primary, #e5e5e5);
      
      box-sizing: border-box;
      font-family: var(--typography-font-families-sans, Inter, system-ui, sans-serif);
    }
    
    :host([theme="dark"]) {
      --color-text-primary: var(--color-brand-neutral-50, #fafafa);
      --color-text-secondary: var(--color-brand-neutral-300, #d4d4d4);
      --color-background-primary: var(--color-brand-neutral-950, #0a0a0a);
      --color-border-primary: var(--color-brand-neutral-700, #404040);
    }
    
    *, *::before, *::after {
      box-sizing: inherit;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.updateTheme();
  }

  private updateTheme() {
    if (this.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.setAttribute('theme', mediaQuery.matches ? 'dark' : 'light');
      
      mediaQuery.addEventListener('change', (e) => {
        if (this.theme === 'auto') {
          this.setAttribute('theme', e.matches ? 'dark' : 'light');
        }
      });
    }
  }
}