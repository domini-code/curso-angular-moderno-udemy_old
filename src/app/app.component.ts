import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AsyncPipe],
})
export class AppComponent {
  _store = inject(Store);

  acceptTerms$ = toSignal(
    this._store.select((state) => state.products.acceptTerms)
  );

  constructor() {
    this._store.subscribe((state) => console.log(state));
  }

  onChange() {
    this._store.dispatch({ type: '[Home Page] Accept Terms' });
  }
}
