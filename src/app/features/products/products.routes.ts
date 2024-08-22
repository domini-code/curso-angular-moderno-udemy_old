import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: ':productId',
    loadComponent: () =>
      import('./details/details.component').then((c) => c.DetailsComponent),
  },
];
export default productRoutes;
