import React, { useState, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import SelectedProductsList from './components/SelectedProductsList';
import CartConfirmation from './components/CartConfirmation';
import { useProducts } from './hooks/useProducts';
import { useSelectedProducts } from './hooks/useSelectedProducts';
import { Product, CartConfirmationResponse } from './types/Product';

function App() {
  const [isCartConfirmationOpen, setIsCartConfirmationOpen] = useState(false);
  const [cartConfirmationData, setCartConfirmationData] = useState<CartConfirmationResponse | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Search products hook
  const { products, loading, error, hasMore, loadMore, totalCount, currentQuery, search } = useProducts();

  // Selected products management hook
  const {
    selectedProducts,
    loading: selectedProductsLoading,
    error: selectedProductsError,
    selectedProductIdForCurrentSearch,
    startNewSearchSession,
    selectProduct,
    removeProduct,
    confirmCart,
  } = useSelectedProducts();

  // Handle search submission
  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      search(searchQuery);
      startNewSearchSession();
    }
  }, [search, startNewSearchSession]);

  // Handle product selection (only one per search)
  const handleProductSelect = useCallback(async (product: Product) => {
    const success = await selectProduct(product);
    if (success) {
      // Product selected successfully
      console.log('Product selected:', product.name);
    }
  }, [selectProduct]);

  // Handle removing a selected product
  const handleRemoveProduct = useCallback(async (productId: number) => {
    const success = await removeProduct(productId);
    if (success) {
      console.log('Product removed:', productId);
    }
  }, [removeProduct]);

  // Handle cart confirmation
  const handleConfirmCart = useCallback(async () => {
    setIsConfirming(true);
    const result = await confirmCart();
    setIsConfirming(false);
    
    if (result) {
      setCartConfirmationData(result);
      setIsCartConfirmationOpen(true);
    }
  }, [confirmCart]);

  const handleCloseCartConfirmation = useCallback(() => {
    setIsCartConfirmationOpen(false);
    setCartConfirmationData(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900" dir="rtl">
              سلامیار - جستجوی هوشمند محصولات 🛍️
            </h1>
            <p className="text-gray-600 mt-2" dir="rtl">
              محصولات مورد نظر خود را جستجو کنید و فروشندگان مناسب را پیدا کنید
            </p>
          </div>
          <SearchBar
            onSearch={handleSearch}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Selected Products List */}
        <SelectedProductsList
          selectedProducts={selectedProducts}
          onRemoveProduct={handleRemoveProduct}
          onConfirmCart={handleConfirmCart}
          loading={isConfirming || selectedProductsLoading}
        />

        {/* Error Display */}
        {(error || selectedProductsError) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6" dir="rtl">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="mr-3">
                <h3 className="text-sm font-medium text-red-800">خطا</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error || selectedProductsError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {currentQuery && (
          <>
            <div className="mb-6 text-right" dir="rtl">
              <p className="text-gray-600">
                {totalCount > 0 ? (
                  <>نمایش {totalCount.toLocaleString('fa-IR')} نتیجه برای "{currentQuery}"</>
                ) : (
                  <>در حال جستجو برای "{currentQuery}"...</>
                )}
              </p>
            </div>

            <ProductGrid
              products={products}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMore}
              selectedProductId={selectedProductIdForCurrentSearch}
              onProductSelect={handleProductSelect}
              showSelectButtons={true}
              error={error}
            />
          </>
        )}

        {/* Initial State - No Search */}
        {!currentQuery && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2" dir="rtl">به سلامیار خوش آمدید</h3>
            <p className="text-gray-600 max-w-md mx-auto" dir="rtl">
              برای شروع، نام محصول مورد نظر خود را در نوار جستجو بالا وارد کنید.
              ما بهترین فروشندگان را برای شما پیدا می‌کنیم.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600" dir="rtl">
          <p>&copy; ۱۴۰۳ سلامیار. تمامی حقوق محفوظ است.</p>
        </div>
      </footer>

      {/* Cart Confirmation Modal */}
      <CartConfirmation
        isOpen={isCartConfirmationOpen}
        onClose={handleCloseCartConfirmation}
        confirmationData={cartConfirmationData}
      />
    </div>
  );
}

export default App;
