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
    <article 
      className={`card-elevated overflow-hidden group ${
        isSelected ? 'shadow-2xl scale-105' : ''
      }`}
      role="article"
      aria-label={`محصول ${product.name}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-52 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/400x300/FED7AA/F97316?text=${encodeURIComponent('تصویر موجود نیست')}`;
          }}
        />
        {!product.is_available && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            ناموجود
          </div>
        )}
        {product.has_free_shipping && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            ارسال رایگان
          </div>
        )}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(218,60,51,0.25), rgba(218,60,51,0.35))' }}>
            <div className="text-white rounded-full p-4 shadow-2xl animate-bounce-slow" style={{ backgroundColor: '#da3c33' }}>
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6 sm:p-8 text-right" dir="rtl">
        <div className="mb-4">
          <span className="inline-block text-sm font-semibold px-4 py-2 rounded-full shadow-sm" style={{ background: 'linear-gradient(135deg, #fff2f1, #ffe6e4)', color: '#b12a24' }}>
            {product.category_title}
          </span>
        </div>
        
        <h3 className="font-bold text-gray-900 text-xl mb-4 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 text-gray-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-sm text-gray-600 font-medium">{product.vendor_name}</p>
          </div>
          <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full inline-block">
            {product.status_title}
          </p>
        </div>
        
        <div className="mb-4">
          <StarRating rating={product.rating_average} reviewCount={product.rating_count} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold gradient-text text-shadow-orange">
              {formatPrice(product.price)} ریال
            </span>
            {product.stock > 0 && (
              <span className="text-sm mt-2 font-semibold" style={{ color: '#da3c33' }}>
                {product.stock} عدد موجود
              </span>
            )}
          </div>
          
          {showSelectButton && (
            <button 
              onClick={handleSelect}
              disabled={isSelected || !product.is_available}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 text-base transform hover:scale-105 ${
                isSelected 
                  ? 'text-white cursor-default' 
                  : product.is_available
                  ? 'btn-primary'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={isSelected ? { backgroundColor: '#da3c33' } : undefined}
              aria-label={isSelected ? 'محصول انتخاب شده' : product.is_available ? `انتخاب ${product.name}` : 'محصول ناموجود'}
              aria-pressed={isSelected}
            >
              {isSelected ? 'انتخاب شده' : product.is_available ? 'انتخاب محصول' : 'ناموجود'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;