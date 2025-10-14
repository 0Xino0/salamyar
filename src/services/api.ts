import {
  SearchResponse,
  SelectedProduct,
  SelectedProductsResponse,
  SelectProductRequest,
  CartConfirmationResponse,
} from '../types/Product';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      errorData?.detail || errorData?.error || `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

export const api = {
  // Search products with pagination
  searchProducts: async (
    query: string,
    from: number = 0,
    size: number = 12
  ): Promise<SearchResponse> => {
    const url = new URL(`${API_BASE_URL}/search/products`);
    url.searchParams.set('q', query);
    url.searchParams.set('from', from.toString());
    url.searchParams.set('size', size.toString());

    const response = await fetch(url.toString());
    return handleResponse<SearchResponse>(response);
  },

  // Select a product
  selectProduct: async (request: SelectProductRequest): Promise<SelectedProduct> => {
    const response = await fetch(`${API_BASE_URL}/selections/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    return handleResponse<SelectedProduct>(response);
  },

  // Get all selected products
  getSelectedProducts: async (): Promise<SelectedProductsResponse> => {
    const response = await fetch(`${API_BASE_URL}/selections/products`);
    return handleResponse<SelectedProductsResponse>(response);
  },

  // Remove a selected product
  removeSelectedProduct: async (productId: number): Promise<{ message: string; success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/selections/products/${productId}`, {
      method: 'DELETE',
    });
    return handleResponse<{ message: string; success: boolean }>(response);
  },

  // Clear all selected products
  clearSelectedProducts: async (): Promise<{ message: string; success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/selections/products`, {
      method: 'DELETE',
    });
    return handleResponse<{ message: string; success: boolean }>(response);
  },

  // Confirm shopping cart and get vendor analysis
  confirmShoppingCart: async (): Promise<CartConfirmationResponse> => {
    const response = await fetch(`${API_BASE_URL}/selections/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return handleResponse<CartConfirmationResponse>(response);
  },
};
