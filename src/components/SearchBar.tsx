import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '' }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="جستجو محصولات... (مثال: آیفون، لپ‌تاپ، کتاب، کفش، لباس)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-primary pr-20 pl-6 py-5 text-xl font-medium"
            dir="rtl"
            aria-label="جستجوی محصولات"
            aria-describedby="search-help"
          />
          <button
            type="submit"
            className="absolute inset-y-0 left-0 pl-6 flex items-center"
            disabled={!inputValue.trim()}
            aria-label="جستجو"
          >
            <div className={`p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              inputValue.trim() 
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-orange hover:shadow-orange-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}>
              <Search className="h-7 w-7" />
            </div>
          </button>
        </div>
        <div id="search-help" className="text-sm text-orange-600 mt-4 text-center font-medium" dir="rtl">
          Enter را فشار دهید یا دکمه جستجو را کلیک کنید
        </div>
      </form>
    </div>
  );
};

export default SearchBar;