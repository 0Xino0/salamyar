import React from 'react';
import { SelectedProduct } from '../types/Product';

// Component to display selected products list

interface SelectedProductsListProps {
  selectedProducts: SelectedProduct[];
  onRemoveProduct: (productId: number) => void;
  onConfirmCart: () => void;
  loading?: boolean;
  hasEverSelectedProducts?: boolean;
}

const SelectedProductsList: React.FC<SelectedProductsListProps> = ({
  selectedProducts,
  onRemoveProduct,
  onConfirmCart,
  loading = false,
  hasEverSelectedProducts = false
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  if (selectedProducts.length === 0 && hasEverSelectedProducts) {
    return (
      <div className="card-elevated p-12 text-center mb-8" dir="rtl">
        <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">فهرست محصولات انتخابی شما خالی است</h3>
        <p className="text-gray-600 text-xl leading-relaxed">برای شروع، محصولات مورد نظر خود را جستجو کرده و انتخاب کنید</p>
      </div>
    );
  }

  // If no products and never selected any, don't show anything
  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <div className="card-elevated p-10 mb-8" dir="rtl">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-orange-lg ml-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">محصولات انتخاب شده</h2>
            <p className="text-gray-600 text-lg font-semibold">{selectedProducts.length} محصول انتخاب شده</p>
          </div>
        </div>
        <button
          onClick={onConfirmCart}
          disabled={loading || selectedProducts.length < 1}
          className={`px-10 py-5 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
            loading || selectedProducts.length < 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'btn-success'
          }`}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin ml-3"></div>
              در حال پردازش...
            </div>
          ) : (
            <div className="flex items-center">
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              تایید و یافتن فروشندگان
            </div>
          )}
        </button>
      </div>
      
      <div className="space-y-6">
        {selectedProducts.map((product) => (
          <div key={product.id} className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-grow">
                {product.image_url && (
                  <div className="relative ml-6">
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      className="w-20 h-20 rounded-xl object-cover shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/80x80/FED7AA/F97316?text=${encodeURIComponent('عکس')}`;
                      }}
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{product.product_name}</h3>
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-600 font-medium">{product.vendor_name}</p>
                  </div>
                  <p className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full inline-block">
                    انتخاب شده در: {new Date(product.selected_at).toLocaleDateString('fa-IR')}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => onRemoveProduct(product.product_id)}
                className="btn-danger p-4 rounded-2xl transition-all duration-300 transform hover:scale-105"
                title="حذف محصول"
                aria-label={`حذف ${product.product_name}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedProductsList;
