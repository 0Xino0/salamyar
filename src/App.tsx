import { useState, useCallback } from 'react';
import { useAuth } from './hooks/useAuth.tsx';
import HeaderNav from './components/HeaderNav.tsx';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import SelectedProductsList from './components/SelectedProductsList';
import CartConfirmation from './components/CartConfirmation';
import ErrorBoundary from './components/ErrorBoundary';
import { useProducts } from './hooks/useProducts';
import { useSelectedProducts } from './hooks/useSelectedProducts';
import { Product, CartConfirmationResponse } from './types/Product';

function App() {
  const { loading: authLoading } = useAuth();
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
    hasEverSelectedProducts,
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

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-gray-600" dir="rtl">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  // Main app (assumes user is authenticated via routing)
  return (
    <ErrorBoundary>
      <div className="min-h-screen relative">
        {/* Wave background layers (non-intrusive) */}
        <div className="wave-bg-layer">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="bubble b1"></div>
          <div className="bubble b2"></div>
          <div className="bubble b3"></div>
          <div className="bubble b4"></div>
          <div className="bubble b5"></div>
        </div>
        <HeaderNav />
        {/* Header */}
        <header className="glass-nav backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-10 animate-fade-in-up">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-orange-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 text-shadow-orange" dir="rtl">
                سلامیار
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-orange-700 mb-4" dir="rtl">
                جستجوی هوشمند محصولات
              </h2>
              <p className="text-gray-700 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium" dir="rtl">
                با سلامیار، محصولات مورد نظر خود را جستجو کنید و بهترین فروشندگان را پیدا کنید
                <br />
                <span className="text-orange-600 font-semibold">تجربه خرید هوشمند و آسان</span>
              </p>
            </div>
            <div className="animate-fade-in-up max-w-4xl mx-auto" style={{ animationDelay: '0.2s' }}>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Selected Products List */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {/* Render selected products list with empty state handling */}
            <SelectedProductsList
              selectedProducts={selectedProducts}
              onRemoveProduct={handleRemoveProduct}
              onConfirmCart={handleConfirmCart}
              loading={isConfirming || selectedProductsLoading}
              hasEverSelectedProducts={hasEverSelectedProducts}
            />
          </div>

          {/* Error Display */}
          {(error || selectedProductsError) && (
            <div className="card p-6 mb-8 border-red-200 bg-red-50 animate-fade-in-up" dir="rtl">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                </div>
                <div className="mr-4">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">خطا در عملیات</h3>
                  <div className="text-red-700">
                    <p>{error || selectedProductsError}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Search Results */}
          {currentQuery && (
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="card p-6 mb-8" dir="rtl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">نتایج جستجو</h2>
                    <p className="text-gray-600">
                      {totalCount > 0 ? (
                        <>نمایش {totalCount.toLocaleString('fa-IR')} نتیجه برای "{currentQuery}"</>
                      ) : (
                        <>در حال جستجو برای "{currentQuery}"...</>
                      )}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <ProductGrid
                products={products}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={loadMore}
                selectedProductId={selectedProductIdForCurrentSearch || undefined}
                onProductSelect={handleProductSelect}
                showSelectButtons={true}
                error={error}
              />
            </div>
          )}

          {/* Initial State - No Search */}
          {!currentQuery && (
            <div className="text-center py-20 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="card p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold gradient-text mb-4" dir="rtl">به سلامیار خوش آمدید</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8" dir="rtl">
                  برای شروع، نام محصول مورد نظر خود را در نوار جستجو بالا وارد کنید.
                  ما بهترین فروشندگان را برای شما پیدا می‌کنیم.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-5 h-5 text-orange-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    جستجوی هوشمند
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-5 h-5 text-orange-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    مقایسه فروشندگان
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-5 h-5 text-orange-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    تحلیل هوشمند
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="glass mt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold gradient-text mr-3">سلامیار</span>
              </div>
              <p className="text-gray-600 mb-4" dir="rtl">
                جستجوی هوشمند محصولات و یافتن بهترین فروشندگان
              </p>
              <p className="text-sm text-gray-500" dir="rtl">
                &copy; ۱۴۰۳ سلامیار. تمامی حقوق محفوظ است.
              </p>
            </div>
          </div>
        </footer>

        {/* Cart Confirmation Modal */}
        <CartConfirmation
          isOpen={isCartConfirmationOpen}
          onClose={handleCloseCartConfirmation}
          confirmationData={cartConfirmationData}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
