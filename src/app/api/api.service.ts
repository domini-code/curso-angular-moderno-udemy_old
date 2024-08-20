import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../features/products/models/product.model';

@Injectable({ providedIn: 'root' })
export class APIService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _myURL = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this._myURL);
  }

  getProductById(id: number): Observable<Product> {
    return this._httpClient.get<Product>(`${this._myURL}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this._httpClient.post<Product>(this._myURL, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this._httpClient.put<Product>(`${this._myURL}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this._httpClient.delete(`${this._myURL}/${id}`);
  }
}
