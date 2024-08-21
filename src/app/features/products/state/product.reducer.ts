import { createAction, createReducer, on } from '@ngrx/store';

interface ProductState {
  acceptTerms: boolean;
}

const initialState: ProductState = {
  acceptTerms: false,
};

export const productsReducer = createReducer(
  initialState,
  on(createAction('[Home Page] Accept Terms'), (state) => ({
    ...state,
    acceptTerms: !state.acceptTerms,
  }))
);
