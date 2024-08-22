import { createAction, createReducer, on } from '@ngrx/store';
import { ProductState } from '../models/product.model';
import * as productsActions from './products.actions';

const initialState: ProductState = {
  acceptTerms: false, // TODO: remove from here
  products: [],
  loading: false,
  errorMessage: null,
};

export const productsReducer = createReducer(
  initialState,
  on(productsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(productsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(productsActions.loadProductsFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    error: errorMessage,
  })),
  on(createAction('[Home Page] Accept Terms'), (state) => ({
    ...state,
    acceptTerms: !state.acceptTerms,
  }))
);
