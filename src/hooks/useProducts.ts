import { useState, useCallback } from 'react';
import { Product, SearchMeta } from '../types/Product';
import { api, ApiError } from '../services/api';

const ITEMS_PER_PAGE = 12;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<SearchMeta | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');

  const performSearch = useCallback(async (
    query: string,
    fromOffset: number = 0,
    reset: boolean = true
  ) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.searchProducts(query, fromOffset, ITEMS_PER_PAGE);
      
      if (reset) {
        setProducts(response.products);
        setCurrentQuery(query);
      } else {
        setProducts(prev => [...prev, ...response.products]);
      }
      
      setMeta(response.meta);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('خطا در جستجوی محصولات. لطفا دوباره تلاش کنید.');
      }
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const search = useCallback((query: string) => {
    if (!query.trim()) return;
    
    // Reset state for new search
    setProducts([]);
    setMeta(null);
    setError(null);
    
    // Perform the search
    performSearch(query, 0, true);
  }, [performSearch]);

  const loadMore = useCallback(() => {
    if (!currentQuery.trim() || !meta?.has_more || loading) return;
    
    const nextOffset = meta.current_offset + meta.page_size;
    performSearch(currentQuery, nextOffset, false);
  }, [currentQuery, meta, loading, performSearch]);

  const clearResults = useCallback(() => {
    setProducts([]);
    setMeta(null);
    setError(null);
    setCurrentQuery('');
  }, []);

  return {
    products,
    loading,
    error,
    hasMore: meta?.has_more ?? false,
    totalCount: meta?.total_count ?? 0,
    currentQuery,
    search,
    loadMore,
    clearResults
  };
};