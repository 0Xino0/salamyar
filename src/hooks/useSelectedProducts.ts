import { useState, useEffect, useCallback } from 'react';
import { 
  SelectedProduct, 
  SelectedProductsResponse, 
  Product, 
  CartConfirmationResponse 
} from '../types/Product';
import { api, ApiError } from '../services/api';

export const useSelectedProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearchSessionId, setCurrentSearchSessionId] = useState<string | null>(null);
  const [selectedProductIdForCurrentSearch, setSelectedProductIdForCurrentSearch] = useState<number | null>(null);

  // Generate a unique session ID for each search
  const generateSessionId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Start a new search session
  const startNewSearchSession = useCallback(() => {
    const sessionId = generateSessionId();
    setCurrentSearchSessionId(sessionId);
    setSelectedProductIdForCurrentSearch(null);
    return sessionId;
  }, []);

  // Load selected products from backend
  const loadSelectedProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.getSelectedProducts();
      setSelectedProducts(response.products);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('خطا در بارگذاری محصولات انتخابی');
      }
      console.error('Error loading selected products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Select a product (only one per search session)
  const selectProduct = useCallback(async (product: Product) => {
    if (!currentSearchSessionId) {
      setError('جلسه جستجو فعال نیست. لطفا ابتدا جستجو کنید.');
      return false;
    }

    // Check if a product is already selected for this search session
    if (selectedProductIdForCurrentSearch) {
      setError('در هر جستجو فقط می‌توانید یک محصول انتخاب کنید.');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const request = {
        product_id: product.id,
        product_name: product.name,
        vendor_id: product.vendor_id,
        vendor_name: product.vendor_name,
        status_id: product.status_id,
        image_url: product.image?.medium || product.image?.small,
        search_session_id: currentSearchSessionId,
      };

      const selectedProduct = await api.selectProduct(request);
      setSelectedProducts(prev => [selectedProduct, ...prev]);
      setSelectedProductIdForCurrentSearch(product.id);
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('خطا در انتخاب محصول');
      }
      console.error('Error selecting product:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [currentSearchSessionId, selectedProductIdForCurrentSearch]);

  // Remove a selected product
  const removeProduct = useCallback(async (productId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await api.removeSelectedProduct(productId);
      setSelectedProducts(prev => prev.filter(p => p.product_id !== productId));
      
      // If this was the selected product for current search, clear it
      if (selectedProductIdForCurrentSearch === productId) {
        setSelectedProductIdForCurrentSearch(null);
      }
      
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('خطا در حذف محصول');
      }
      console.error('Error removing product:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedProductIdForCurrentSearch]);

  // Confirm cart and get vendor analysis
  const confirmCart = useCallback(async (): Promise<CartConfirmationResponse | null> => {
    if (selectedProducts.length === 0) {
      setError('هیچ محصولی انتخاب نشده است');
      return null;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await api.confirmShoppingCart();
      return response;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('خطا در تایید سبد خرید');
      }
      console.error('Error confirming cart:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedProducts.length]);

  // Clear all selected products
  const clearAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      await api.clearSelectedProducts();
      setSelectedProducts([]);
      setSelectedProductIdForCurrentSearch(null);
      return true;
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('خطا در پاک کردن تمام محصولات');
      }
      console.error('Error clearing products:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load selected products on mount
  useEffect(() => {
    loadSelectedProducts();
  }, [loadSelectedProducts]);

  return {
    selectedProducts,
    loading,
    error,
    currentSearchSessionId,
    selectedProductIdForCurrentSearch,
    startNewSearchSession,
    selectProduct,
    removeProduct,
    confirmCart,
    clearAllProducts,
    loadSelectedProducts,
  };
};
