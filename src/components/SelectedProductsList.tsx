import React from 'react';
import { SelectedProduct } from '../types/Product';

interface SelectedProductsListProps {
  selectedProducts: SelectedProduct[];
  onRemoveProduct: (productId: number) => void;
  onConfirmCart: () => void;
  loading?: boolean;
}

const SelectedProductsList: React.FC<SelectedProductsListProps> = ({
  selectedProducts,
  onRemoveProduct,
  onConfirmCart,
  loading = false
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  if (selectedProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 mb-8" dir="rtl">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">فهرست محصولات انتخابی شما خالی است</h3>
        <p className="text-gray-600">برای شروع، محصولات مورد نظر خود را جستجو کرده و انتخاب کنید</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8" dir="rtl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">محصولات انتخاب شده ({selectedProducts.length})</h2>
        <button
          onClick={onConfirmCart}
          disabled={loading || selectedProducts.length < 1}
          className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
            loading || selectedProducts.length < 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {loading ? 'در حال پردازش...' : 'تایید و یافتن فروشندگان'}
        </button>
      </div>
      
      <div className="space-y-4">
        {selectedProducts.map((product) => (
          <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center flex-grow">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-16 h-16 rounded-md object-cover ml-4"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/64x64/E5E7EB/4B5563?text=${encodeURIComponent('عکس')}`;
                  }}
                />
              )}
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 mb-1">{product.product_name}</h3>
                <p className="text-sm text-gray-600">{product.vendor_name}</p>
                <p className="text-xs text-gray-500">
                  انتخاب شده در: {new Date(product.selected_at).toLocaleDateString('fa-IR')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => onRemoveProduct(product.product_id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                title="حذف محصول"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
