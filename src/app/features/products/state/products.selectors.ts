import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from '../models/product.model';

export const selectProductsState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  ({ products }) => products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  ({ loading }) => loading
);
