import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../features/products/models/product.model';

@Injectable({ providedIn: 'root' })
export class APIService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _MyURL = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this._MyURL);
  }
}
