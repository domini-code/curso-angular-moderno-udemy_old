import { isDevMode } from '@angular/core';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  providers: [
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode(), trace: true }),
  ],
};
