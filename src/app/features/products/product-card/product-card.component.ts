import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, SlicePipe, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  // @Input({ required: true }) product!: Product;
  // toggleCategory = output();
  showCategory = false;
  currentProduct = input.required<Product>({ alias: 'product' });

  toggleCategory() {
    this.showCategory = !this.showCategory;
  }
}
