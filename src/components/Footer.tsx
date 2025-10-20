export default function Footer() {
  return (
    <footer className="glass mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" dir="rtl">
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.svg" alt="لوگوی سلامیار" className="w-10 h-10 rounded-xl" />
              <span className="text-xl font-bold gradient-text mr-3">سلامیار</span>
            </div>
            <p className="text-gray-600">هوشمندانه جستجو کنید، اقتصادی خرید کنید</p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-3">ارتباط با ما</h4>
            <a href="https://t.me/Mahdavi1831" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#174d7a' }}>@Mahdavi1831</a>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-3">درباره ما</h4>
            <a href="/about" className="underline" style={{ color: '#174d7a' }}>در حال ساخت</a>
          </div>
        </div>
        <div className="text-center mt-10 text-sm text-gray-500">&copy; 1404 سلامیار</div>
      </div>
    </footer>
  );
}


