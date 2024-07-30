import { Component, input } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  template: `<p>Show product details {{ productId() }}</p>`,
})
export class DetailsComponent {
  // @Input() productId!: number;
  productId = input.required<number>();
}
