import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { APIService } from '../../../api/api.service';
import { Product } from '../models/product.model';
import * as productsActions from './products.actions';

@Injectable()
export class ProductEffects {
  loadProducts$: any;

  private readonly _apiSvc = inject(APIService);
  private readonly _actions$ = inject(Actions);
  constructor() {
    this.loadProducts$ = createEffect(() =>
      this._actions$.pipe(
        ofType(productsActions.loadProducts),
        exhaustMap(() =>
          this._apiSvc.getProducts().pipe(
            map((products: Product[]) =>
              productsActions.loadProductsSuccess({ products })
            ),
            catchError((error) =>
              of(productsActions.loadProductsFailure({ errorMessage: error }))
            )
          )
        )
      )
    );
  }
}
