import React from 'react';
import { Product } from '../types/Product';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  isSelected?: boolean;
  showSelectButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onSelect, 
  isSelected = false, 
  showSelectButton = false 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const productImage = product.image?.medium || product.image?.small || 
    `https://placehold.co/400x300/F3F4F6/6B7280?text=${encodeURIComponent(product.name)}`;

  const handleSelect = () => {
    if (onSelect && !isSelected) {
      onSelect(product);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border ${
      isSelected ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-100'
    }`}>
      <div className="relative overflow-hidden">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x300/F3F4F6/6B7280?text=${encodeURIComponent('تصویر موجود نیست')}`;
          }}
        />
        {!product.is_available && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            ناموجود
          </div>
        )}
        {product.has_free_shipping && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-medium">
            ارسال رایگان
          </div>
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-orange-500 bg-opacity-20 flex items-center justify-center">
            <div className="bg-orange-500 text-white rounded-full p-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6 text-right" dir="rtl">
        <div className="mb-2">
          <span className="text-xs text-gray-500 font-medium">
            {product.category_title}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600">{product.vendor_name}</p>
          <p className="text-xs text-gray-500">{product.status_title}</p>
        </div>
        
        <div className="mb-4">
          <StarRating rating={product.rating_average} reviewCount={product.rating_count} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)} تومان
            </span>
            {product.stock > 0 && (
              <span className="text-xs text-gray-500">
                {product.stock} عدد موجود
              </span>
            )}
          </div>
          
          {showSelectButton && (
            <button 
              onClick={handleSelect}
              disabled={isSelected || !product.is_available}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
                isSelected 
                  ? 'bg-orange-500 text-white cursor-default' 
                  : product.is_available
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSelected ? 'انتخاب شده' : product.is_available ? 'انتخاب محصول' : 'ناموجود'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;