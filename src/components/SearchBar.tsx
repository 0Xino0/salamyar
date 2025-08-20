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
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="جستجو محصولات... (Enter را فشار دهید یا دکمه جستجو را کلیک کنید)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="block w-full pr-4 pl-16 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200 bg-white shadow-sm hover:shadow-md text-right"
          dir="rtl"
        />
        <button
          type="submit"
          className="absolute inset-y-0 left-0 pl-4 flex items-center"
          disabled={!inputValue.trim()}
        >
          <div className={`p-2 rounded-lg transition-colors duration-200 ${
            inputValue.trim() 
              ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}>
            <Search className="h-5 w-5" />
          </div>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;