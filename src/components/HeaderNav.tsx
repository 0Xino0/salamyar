import { useAuth } from '../hooks/useAuth.tsx';
import logoWave from '../assets/logo-wave.svg';

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
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Site Name */}
          <a href="/" className="flex items-center" aria-label="رفتن به صفحه فرود">
            <div className="w-12 h-12 rounded-full bg-white/80 border border-white/60 shadow-lg flex items-center justify-center overflow-hidden">
              <img src={logoWave} alt="Salamyar logo" className="w-10 h-10 rounded-full object-cover" />
            </div>
            <span className="text-2xl font-bold gradient-text mr-3" dir="rtl">سلامیار</span>
          </a>

          {/* Auth Buttons */}
          <div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <button onClick={handleLogout} className="btn-secondary" dir="rtl">
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={onRegisterClick ? onRegisterClick : () => (window.location.href = '/')}
                  className="btn-secondary"
                  dir="rtl"
                >
                  ثبت نام
                </button>
                <button
                  onClick={onLoginClick ? onLoginClick : () => (window.location.href = '/')}
                  className="btn-primary"
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


