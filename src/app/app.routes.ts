import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found.component';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('../app/features/products/products.routes'),
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
