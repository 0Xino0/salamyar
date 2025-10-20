import { useAuth } from '../hooks/useAuth.tsx';

interface HeaderNavProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

export default function HeaderNav({ onLoginClick, onRegisterClick }: HeaderNavProps) {
  const { isAuthenticated, logout } = useAuth();

  // Use React Router navigation to preserve SPA state

  const handleLogout = async () => {
    await logout();
    window.location.href = '/';
  };

  return (
    <header className="glass-nav backdrop-blur-md relative z-10">
      <div className="w-full px-3 md:px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Site Name */}
          <a href="/" className="flex items-center" aria-label="رفتن به صفحه فرود">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 border border-white/60 shadow-lg flex items-center justify-center overflow-hidden">
              <img src="/logo.svg" alt="لوگوی سلامیار" className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover" />
            </div>
            <span className="text-lg md:text-2xl font-bold mr-2" style={{ color: '#174d7a' }} dir="rtl">سلامیار</span>
          </a>

          {/* Auth Buttons */}
          <div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 space-x-reverse">
                <button onClick={handleLogout} className="btn-secondary text-sm md:text-base !px-4 md:!px-5 !py-2.5 md:!py-3 rounded-xl" dir="rtl">
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={onRegisterClick ? onRegisterClick : () => (window.location.href = '/')}
                  className="text-sm md:text-base !px-4 md:!px-5 !py-2.5 md:!py-3 rounded-xl shadow-md focus:outline-none"
                  style={{ backgroundColor: '#174d7a', color: '#ffffff', border: 'none' }}
                  dir="rtl"
                >
                  ثبت نام
                </button>
                <button
                  onClick={onLoginClick ? onLoginClick : () => (window.location.href = '/')}
                  className="text-sm md:text-base !px-4 md:!px-5 !py-2.5 md:!py-3 rounded-xl shadow-md focus:outline-none"
                  style={{ backgroundColor: '#174d7a', color: '#ffffff', border: 'none' }}
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
  );
}


