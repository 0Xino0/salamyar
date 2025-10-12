import React, { useEffect, useRef, useCallback } from 'react';
import { Product } from '../types/Product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  selectedProductId?: number;
  onProductSelect?: (product: Product) => void;
  showSelectButtons?: boolean;
  error?: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  hasMore,
  onLoadMore,
  selectedProductId,
  onProductSelect,
  showSelectButtons = false,
  error,
}) => {
  const observer = useRef<IntersectionObserver>();
  
  const lastProductElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        onLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, onLoadMore]);

  if (error) {
    return (
      <div className="card p-12 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">خطا در بارگذاری محصولات</h3>
        <p className="text-gray-600 text-lg" dir="rtl">{error}</p>
      </div>
    );
  }

  if (products.length === 0 && !loading) {
    return (
      <div className="card p-12 text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3" dir="rtl">محصولی یافت نشد</h3>
        <p className="text-gray-600 text-lg" dir="rtl">برای یافتن محصولات، عبارت جستجوی خود را وارد کنید</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {products.map((product, index) => {
          const isSelected = selectedProductId === product.id;
          
          if (products.length === index + 1) {
            return (
              <div ref={lastProductElementRef} key={product.id}>
                <ProductCard 
                  product={product} 
                  onSelect={onProductSelect}
                  isSelected={isSelected}
                  showSelectButton={showSelectButtons}
                />
              </div>
            );
          } else {
            return (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelect={onProductSelect}
                isSelected={isSelected}
                showSelectButton={showSelectButtons}
              />
            );
          }
        })}
      </div>
      
      {loading && (
        <div className="flex justify-center py-12">
          <div className="card p-8">
            <div className="flex items-center space-x-3 text-gray-600" dir="rtl">
              <div className="w-6 h-6 border-3 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-medium">در حال بارگذاری محصولات بیشتر...</span>
            </div>
          </div>
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <div className="text-center py-12">
          <div className="card p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg font-medium" dir="rtl">به انتهای فهرست محصولات رسیده‌اید</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;