import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.tsx';
import LoginModal from './LoginModal.tsx';
import RegisterModal from './RegisterModal.tsx';
import logoWave from '../assets/logo-wave.svg';

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();

  // Animated search icons in background
  const [searchIcons, setSearchIcons] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate random search icons for background animation
    const icons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setSearchIcons(icons);
  }, []);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalOpen(true);
  };

  const handleLogout = async () => {
    await logout();
    // Redirect back to landing page
    window.location.href = '/';
  };

  const switchToRegister = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Wave background layers (non-intrusive) */}
      <div className="wave-bg-layer">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="bubble b1"></div>
        <div className="bubble b2"></div>
        <div className="bubble b3"></div>
        <div className="bubble b4"></div>
        <div className="bubble b5"></div>
      </div>
      {/* Animated Background Search Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {searchIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute text-orange-200/30 animate-pulse-slow"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              animationDelay: `${icon.delay}s`,
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="glass-nav backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Site Name */}
            <a href="/" className="flex items-center" aria-label="رفتن به صفحه فرود">
              <div className="w-9 h-9 rounded-full bg-white/80 border border-white/60 shadow-lg flex items-center justify-center overflow-hidden">
                <img src={logoWave} alt="Salamyar logo" className="w-8 h-8 rounded-full object-cover" />
              </div>
              <span className="text-xl font-bold gradient-text mr-2" dir="rtl">سلامیار</span>
            </a>

            {/* Login/Logout Button */}
            <div>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-sm !px-4 !py-2 rounded-xl"
                    dir="rtl"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={handleRegisterClick}
                    className="btn-secondary text-sm !px-4 !py-2 rounded-xl"
                    dir="rtl"
                  >
                    ثبت نام
                  </button>
                  <button
                    onClick={handleLoginClick}
                    className="btn-primary text-sm !px-4 !py-2 rounded-xl"
                    dir="rtl"
                  >
                    ورود
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="animate-fade-in-up">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 text-shadow-orange" dir="rtl">
                  سلامیار
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-orange-700 mb-6" dir="rtl">
                  جستجوی هوشمند محصولات
                </h2>
                <p className="text-gray-700 text-xl leading-relaxed font-medium" dir="rtl">
                  با سلامیار، محصولات مورد نظر خود را جستجو کنید و بهترین فروشندگان را پیدا کنید.
                  تجربه خرید هوشمند و آسان را با ما داشته باشید.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-lg text-gray-600" dir="rtl">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center ml-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  جستجوی هوشمند و سریع محصولات
                </div>
                <div className="flex items-center text-lg text-gray-600" dir="rtl">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center ml-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  مقایسه فروشندگان و قیمت‌ها
                </div>
                <div className="flex items-center text-lg text-gray-600" dir="rtl">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center ml-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  تحلیل هوشمند و پیشنهادات شخصی
                </div>
                <div className="flex items-center text-lg text-gray-600" dir="rtl">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center ml-4">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  رابط کاربری ساده و زیبا
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => window.location.href = '/app'}
                  className="btn-primary text-xl px-12 py-6"
                  dir="rtl"
                >
                  شروع کنید
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Image */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-orange-lg animate-bounce-slow">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-orange-800 mb-4" dir="rtl">
                    جستجوی هوشمند
                  </h3>
                  <p className="text-orange-700 text-lg" dir="rtl">
                    محصولات مورد نظر خود را پیدا کنید
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-300/50 rounded-full animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400/50 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="text-2xl font-bold gradient-text mr-3">سلامیار</span>
            </div>
            <p className="text-gray-600 mb-4" dir="rtl">
              جستجوی هوشمند محصولات و یافتن بهترین فروشندگان
            </p>
            <p className="text-sm text-gray-500" dir="rtl">
              &copy; ۱۴۰۳ سلامیار. تمامی حقوق محفوظ است.
            </p>
          </div>
        </div>
      </footer>

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