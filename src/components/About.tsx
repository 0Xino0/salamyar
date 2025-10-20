import Footer from './Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="card-elevated p-10 max-w-xl w-full text-center">
          <h1 className="text-3xl font-bold mb-4 gradient-text">درباره ما</h1>
          <p className="text-gray-700 text-lg">در حال ساخت</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}


