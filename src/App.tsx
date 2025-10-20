import { useState, useCallback } from 'react';
import { useAuth } from './hooks/useAuth.tsx';
import HeaderNav from './components/HeaderNav.tsx';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import SelectedProductsList from './components/SelectedProductsList';
import CartConfirmation from './components/CartConfirmation';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import { useProducts } from './hooks/useProducts';
import { useSelectedProducts } from './hooks/useSelectedProducts';
import { Product, CartConfirmationResponse } from './types/Product';

function App() {
  const { loading: authLoading } = useAuth();
  const [isCartConfirmationOpen, setIsCartConfirmationOpen] = useState(false);
  const [cartConfirmationData, setCartConfirmationData] = useState<CartConfirmationResponse | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showNoteMore, setShowNoteMore] = useState(false);

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
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow" style={{ backgroundColor: '#da3c33' }}>
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
              <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-4 text-shadow-orange" dir="rtl">
                سلامیار
              </h1>
              <p className="text-gray-700 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium" dir="rtl">
                محصولات مورد نظر خود را در کادر زیر جستجو کنید.
                <br />
                <span className="text-sm md:text-base" style={{ color: '#da3c33' }}>
                  توجه داشته باشید که هر بار فقط اسم یک محصول را در کادر زیر میتوانید وارد کنید.
                  {!showNoteMore ? (
                    <button
                      type="button"
                      onClick={() => setShowNoteMore(true)}
                      className="ml-1 underline"
                      style={{ color: '#da3c33' }}
                    >
                      ...
                    </button>
                  ) : (
                    <>
                      <span className="block mt-2 text-gray-700" dir="rtl">
                        پس از انتخاب محصولی که نام آن را جستجو کرده اید میتوانید نام محصول مورد نظر بعدی خود را در کادر زیر نوشته و جستجو کنید ؛ تا وقتی که تمامی محصولات را انتخاب کرده و با زدن دکمه تایید و یافتن فروشندگان جستجو هوشمند سلامیار آغاز میشود.
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowNoteMore(false)}
                        className="mt-1 underline"
                        style={{ color: '#da3c33' }}
                      >
                        بستن
                      </button>
                    </>
                  )}
                </span>
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
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#da3c33' }}>
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

          {/* Initial state section removed per request */}
        </main>

        <Footer />

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
