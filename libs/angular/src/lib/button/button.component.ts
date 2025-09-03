import { Component, Input } from '@angular/core';
import { button } from '@ridge/styles';

@Component({
  selector: 'lib-ridge-button',
  template: `
    <button [class]="buttonClass">
      <ng-content></ng-content>
    </button>
  `,
  standalone: true,
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'small' | 'large' = 'small';

  get buttonClass(): string {
    return button({ variant: this.variant, size: this.size });
  }
}
