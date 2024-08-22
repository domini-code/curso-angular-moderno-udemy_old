import { AsyncPipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Product } from './models/product.model';
import { ProductCardComponent } from './product-card/product-card.component';
import * as productsActions from './state/products.actions';
import {
  selectAllProducts,
  selectProductsLoading,
} from './state/products.selectors';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly _store = inject(Store);

  loading$ = this._store.select(selectProductsLoading);
  products$: Signal<Product[] | undefined>;

  constructor() {
    this._store.dispatch(productsActions.loadProducts());
    this.products$ = toSignal(this._store.select(selectAllProducts));
  }
}
