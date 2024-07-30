import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../api/api.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;

  private readonly _apiSvc = inject(APIService);

  ngOnInit(): void {
    this.products$ = this._apiSvc.getProducts();
  }

  trackFn(_: number, product: Product): number {
    return product.id;
  }
}
