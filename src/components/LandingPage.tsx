import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';
import LoginModal from './LoginModal.tsx';
import RegisterModal from './RegisterModal.tsx';
import HeaderNav from './HeaderNav.tsx';
import Footer from './Footer.tsx';

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  // Background animations removed for a clean, minimalist layout

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  // Logout handled within HeaderNav in main header

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="min-h-screen relative">
      {/* Header (same as main) */}
      <HeaderNav onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />

      {/* Main Content */}
      <main className="w-full max-w-[1200px] mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-fade-in-up">
            <div className="space-y-8 md:space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-6" style={{ color: '#174d7a' }} dir="rtl">
                  سلامیار: هوشمندانه جستجو کنید، اقتصادی خرید کنید
                </h2>
                <p className="text-gray-700 text-xl leading-relaxed font-medium max-w-xl" style={{ color: '#000000' }} dir="rtl">
                  کافیست لیست محصولات مورد نظرتان را جستجو کنید تا بهترین غرفه‌داران که بیشترین کالاهای لیست شما را دارند، پیدا شوند.
                </p>
              </div>

              {/* Features moved below into a dedicated section */}

              <div className="pt-6">
                {isAuthenticated ? (
                  <button
                    onClick={() => window.location.href = '/main'}
                    className="text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-md focus:outline-none focus:ring-4"
                    style={{ backgroundColor: '#8cbc4b' }}
                    dir="rtl"
                  >
                    شروع کنید
                  </button>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="text-white text-xl font-semibold px-8 py-4 rounded-2xl shadow-md focus:outline-none focus:ring-4"
                    style={{ backgroundColor: '#8cbc4b' }}
                    dir="rtl"
                  >
                    شروع کنید
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Logo Only (flat, no box) */}
          <div className="flex items-center justify-center min-h-64 md:min-h-80 lg:min-h-96">
            <img src="/logo.svg" alt="Site Logo" className="w-[160px] md:w-[240px] lg:w-[320px] h-auto" />
          </div>
        </div>
      </main>

      {/* Features Section (moved from hero body) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
          <div className="flex items-center text-lg text-gray-700 bg-white rounded-2xl p-6 border border-orange-100" dir="rtl">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center ml-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            جستجوی هوشمند و سریع محصولات
          </div>
          <div className="flex items-center text-lg text-gray-700 bg-white rounded-2xl p-6 border border-orange-100" dir="rtl">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center ml-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            مقایسه فروشندگان و قیمت‌ها
          </div>
          <div className="flex items-center text-lg text-gray-700 bg-white rounded-2xl p-6 border border-orange-100" dir="rtl">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items_center justify_center ml-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            تحلیل هوشمند و پیشنهادات شخصی
          </div>
          <div className="flex items-center text-lg text-gray-700 bg-white rounded-2xl p-6 border border-orange-100" dir="rtl">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center ml-4">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            رابط کاربری ساده و زیبا
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={switchToRegister}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={switchToLogin}
      />
    </div>
  );
}