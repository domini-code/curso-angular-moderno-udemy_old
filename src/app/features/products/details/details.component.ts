import {
  Component,
  computed,
  inject,
  Injector,
  input,
  OnInit,
  runInInjectionContext,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { APIService } from '../../../api/api.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [FormsModule],
  template: `
    @defer (when currentProduct$()) {
      @let product = currentProduct$();
      <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6 text-gray-800">
          Edit Product {{ productId() }}
        </h2>
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Name:</label
            >
            <input
              type="text"
              id="name"
              [(ngModel)]="product.title"
              name="name"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700"
              >Price:</label
            >
            <input
              type="number"
              id="price"
              [(ngModel)]="product.price"
              name="price"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
            />
          </div>
          <div class="flex space-x-4">
            <button
              type="submit"
              class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Save Changes
            </button>
            <button
              type="button"
              (click)="onDelete()"
              class="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    } @placeholder {
      <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <p>Loading product details...</p>
      </div>
    }
  `,
})
export class DetailsComponent implements OnInit {
  productId = input.required<number>();

  private readonly _APISvc = inject(APIService);
  private readonly _injector = inject(Injector);

  private _productSignal!: Signal<Product>;

  currentProduct$ = computed(() => this._productSignal());

  ngOnInit(): void {
    runInInjectionContext(this._injector, () => {
      this._productSignal = toSignal(
        this._APISvc.getProductById(this.productId()),
      ) as Signal<Product>;
    });
  }

  onSubmit() {
    this._APISvc
      .updateProduct(this.currentProduct$().id, this.currentProduct$())
      .pipe(tap((product: Product) => console.log('Product updated', product)))
      .subscribe();
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this._APISvc
        .deleteProduct(this.currentProduct$().id)
        .pipe(
          tap(() => {
            console.log('Product deleted', this.currentProduct$().id);
            // TODO: Implement navigation to product list or other appropriate action
          }),
        )
        .subscribe();
    }
  }
}
