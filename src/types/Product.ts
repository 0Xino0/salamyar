export interface ProductImage {
  medium?: string;
  small?: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: ProductImage;
  vendor_id: number;
  vendor_name: string;
  status_id: number;
  status_title: string;
  category_title: string;
  is_available: boolean;
  has_free_shipping: boolean;
  rating_average: number;
  rating_count: number;
  stock: number;
}

export interface SearchMeta {
  total_count: number;
  page_size: number;
  current_offset: number;
  has_more: boolean;
}

export interface SearchResponse {
  products: Product[];
  meta: SearchMeta;
}

export interface SelectedProduct {
  id: number;
  product_id: number;
  product_name: string;
  vendor_id: number;
  vendor_name: string;
  status_id: number;
  image_url?: string;
  selected_at: string;
  search_session_id?: string;
}

export interface SelectedProductsResponse {
  products: SelectedProduct[];
  total_count: number;
}

export interface SelectProductRequest {
  product_id: number;
  product_name: string;
  vendor_id: number;
  vendor_name: string;
  status_id: number;
  image_url?: string;
  search_session_id?: string;
}

export interface SimilarProduct {
  id: number;
  name: string;
  price: number;
  vendor_id: number;
  vendor_name: string;
  status_id: number;
  image_url?: string;
  basalam_url: string;
  original_product_id: number;
}

export interface VendorMatch {
  vendor_id: number;
  vendor_name: string;
  matched_products_count: number;
  user_selected_products: number[];
  similar_products: SimilarProduct[];
}

export interface CartConfirmationResponse {
  total_selected_products: number;
  total_similar_products_found: number;
  vendors_with_multiple_matches: VendorMatch[];
  processing_summary: Record<string, any>;
}