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
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto" style={{ border: '1px solid #f5c2bf' }}>
        <div className="sticky top-0 px-10 py-8 rounded-t-3xl" style={{ background: 'linear-gradient(90deg, #fff2f1, #ffe6e4)', borderBottom: '1px solid #f5c2bf' }}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center ml-6" style={{ backgroundColor: '#da3c33' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-4xl font-bold gradient-text text-shadow-orange" dir="rtl">نتایج تحلیل سبد خرید</h2>
                <p className="text-gray-600 mt-2 text-lg font-semibold" dir="rtl">تحلیل هوشمند فروشندگان و محصولات مشابه</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-200 rounded-2xl p-4"
              aria-label="بستن"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8" dir="rtl">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {confirmationData.total_selected_products}
              </div>
              <div className="text-lg font-semibold text-blue-800">محصولات انتخابی شما</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {confirmationData.total_similar_products_found}
              </div>
              <div className="text-lg font-semibold text-green-800">محصولات مشابه یافت شده</div>
            </div>
            <div className="rounded-2xl p-6 text-center shadow-lg" style={{ background: 'linear-gradient(135deg, #fff2f1, #ffe6e4)', border: '1px solid #f5c2bf' }}>
              <div className="text-4xl font-bold mb-2" style={{ color: '#da3c33' }}>
                {confirmationData.vendors_with_multiple_matches.length}
              </div>
              <div className="text-lg font-semibold" style={{ color: '#b12a24' }}>فروشندگان با چندین محصول</div>
            </div>
          </div>

          {/* Vendor Matches */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              فروشندگانی که حداقل ۲ محصول از لیست شما را دارند:
            </h3>
            
            {confirmationData.vendors_with_multiple_matches.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                <div className="text-gray-400 mb-6">
                  <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.441-.935-6-2.447m12 0A7.962 7.962 0 0112 15c2.34 0 4.441-.935 6-2.447M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  هیچ فروشنده‌ای چندین محصول از لیست شما را ندارد
                </h4>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  متأسفانه فروشنده‌ای یافت نشد که بیش از یک محصول از لیست انتخابی شما را داشته باشد.
                  ممکن است لازم باشد از فروشندگان مختلف خرید کنید.
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {confirmationData.vendors_with_multiple_matches.map((vendor: VendorMatch) => (
                  <div key={vendor.vendor_id} className="rounded-2xl p-8 shadow-lg" style={{ background: 'linear-gradient(135deg, #fff2f1, #ffe6e4)', border: '1px solid #f5c2bf' }}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-2xl font-bold mb-3" style={{ color: '#b12a24' }}>
                          {vendor.vendor_name}
                        </h4>
                        <p className="mb-3 text-lg font-semibold" style={{ color: '#c7322b' }}>
                          این فروشنده {vendor.matched_products_count} محصول از لیست شما را دارد
                        </p>
                      </div>
                      <div className="text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg" style={{ backgroundColor: '#da3c33' }}>
                        {vendor.matched_products_count} محصول
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h5 className="font-bold text-gray-800 mb-4 text-lg">محصولات مشابه موجود:</h5>
                      {vendor.similar_products.map((product) => (
                        <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md" style={{ border: '1px solid #f5c2bf' }}>
                          <div className="flex justify-between items-start">
                            <div className="flex-grow">
                              <h6 className="font-medium text-gray-900 mb-2">{product.name}</h6>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>قیمت: {formatPrice(product.price)} ریال</p>
                                <p>شناسه محصول اصلی شما: {product.original_product_id}</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3 mr-6">
                              <a
                                href={product.basalam_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary px-6 py-3 text-center text-sm font-semibold"
                              >
                                مشاهده در باسلام
                              </a>
                              {product.image_url && (
                                <img
                                  src={product.image_url}
                                  alt={product.name}
                                  className="w-20 h-20 rounded-xl object-cover shadow-md"
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

        <div className="sticky bottom-0 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 px-8 py-6">
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-12 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
