import { AsyncPipe } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { APIService } from '../../api/api.service';
import { Product } from './models/product.model';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  // products$!: Observable<Product[]>;
  products$: Signal<Product[] | undefined>;

  private readonly _apiSvc = inject(APIService);

  constructor() {
    this.products$ = toSignal(this._apiSvc.getProducts());
  }
}
