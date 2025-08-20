import React from 'react';
import { CartConfirmationResponse, VendorMatch } from '../types/Product';

interface CartConfirmationProps {
  confirmationData: CartConfirmationResponse | null;
  onClose: () => void;
  isOpen: boolean;
}

const CartConfirmation: React.FC<CartConfirmationProps> = ({
  confirmationData,
  onClose,
  isOpen
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  if (!isOpen || !confirmationData) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900" dir="rtl">نتایج تحلیل سبد خرید</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-2"
              aria-label="بستن"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6" dir="rtl">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {confirmationData.total_selected_products}
              </div>
              <div className="text-sm text-blue-800">محصولات انتخابی شما</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {confirmationData.total_similar_products_found}
              </div>
              <div className="text-sm text-green-800">محصولات مشابه یافت شده</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {confirmationData.vendors_with_multiple_matches.length}
              </div>
              <div className="text-sm text-orange-800">فروشندگان با چندین محصول</div>
            </div>
          </div>

          {/* Vendor Matches */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              فروشندگانی که حداقل ۲ محصول از لیست شما را دارند:
            </h3>
            
            {confirmationData.vendors_with_multiple_matches.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.441-.935-6-2.447m12 0A7.962 7.962 0 0112 15c2.34 0 4.441-.935 6-2.447M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  هیچ فروشنده‌ای چندین محصول از لیست شما را ندارد
                </h4>
                <p className="text-gray-600">
                  متأسفانه فروشنده‌ای یافت نشد که بیش از یک محصول از لیست انتخابی شما را داشته باشد.
                  ممکن است لازم باشد از فروشندگان مختلف خرید کنید.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {confirmationData.vendors_with_multiple_matches.map((vendor: VendorMatch) => (
                  <div key={vendor.vendor_id} className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-xl font-semibold text-orange-800 mb-2">
                          {vendor.vendor_name}
                        </h4>
                        <p className="text-orange-700 mb-2">
                          این فروشنده {vendor.matched_products_count} محصول از لیست شما را دارد
                        </p>
                      </div>
                      <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {vendor.matched_products_count} محصول
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium text-gray-800 mb-3">محصولات مشابه موجود:</h5>
                      {vendor.similar_products.map((product) => (
                        <div key={product.id} className="bg-white border border-orange-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow">
                              <h6 className="font-medium text-gray-900 mb-2">{product.name}</h6>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>قیمت: {formatPrice(product.price)} تومان</p>
                                <p>شناسه محصول اصلی شما: {product.original_product_id}</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 mr-4">
                              <a
                                href={product.basalam_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 text-center"
                              >
                                مشاهده در باسلام
                              </a>
                              {product.image_url && (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-16 h-16 rounded-md object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Processing Summary */}
          {Object.keys(confirmationData.processing_summary).length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">خلاصه پردازش:</h3>
              <div className="space-y-3">
                {Object.entries(confirmationData.processing_summary).map(([productId, summary]: [string, any]) => (
                  <div key={productId} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{summary.product_name || `محصول ${productId}`}</span>
                    <div className="text-gray-600">
                      {summary.similar_products_found} محصول مشابه - {summary.vendors_found} فروشنده
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4">
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartConfirmation;
