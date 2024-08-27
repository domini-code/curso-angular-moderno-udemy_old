import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Injector,
  OnInit,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Product } from './models/product.model';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsPageActions } from './state/products.actions';
import {
  selectAllProducts,
  selectProductsError,
  selectProductsLoading,
} from './state/products.selectors';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  private readonly _store = inject(Store);
  private readonly _injector = inject(Injector);
  private _productsSignal!: Signal<Product[]>;

  loading$ = this._store.select(selectProductsLoading);
  products$ = computed(() => this._productsSignal());
  errorMessage$ = this._store.select(selectProductsError);

  ngOnInit(): void {
    this._store.dispatch(ProductsPageActions.loadProducts());

    runInInjectionContext(this._injector, () => {
      this._productsSignal = toSignal(
        this._store.select(selectAllProducts),
      ) as unknown as Signal<Product[]>;
    });
  }
}
