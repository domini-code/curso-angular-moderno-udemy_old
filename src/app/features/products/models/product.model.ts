export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export interface ProductState {
  acceptTerms: boolean;
  products: Product[];
  loading: boolean;
  errorMessage: string | null;
}
