import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { RegisterRequest } from '../types/User';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    phone: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { register, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    if (formData.password !== confirmPassword) {
      setPasswordError('رمزهای عبور مطابقت ندارند');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError('رمز عبور باید حداقل ۶ کاراکتر باشد');
      setIsSubmitting(false);
      return;
    }

    const success = await register(formData);
    if (success) {
      onClose();
      setFormData({ username: '', phone: '', password: '' });
      setConfirmPassword('');
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (passwordError) {
      setPasswordError(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="card-elevated max-w-md w-full p-8 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold gradient-text mb-2" dir="rtl">ثبت نام</h2>
          <p className="text-gray-600" dir="rtl">حساب کاربری جدید ایجاد کنید</p>
        </div>

        {(error || passwordError) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6" dir="rtl">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-700 font-medium">{passwordError || error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2" dir="rtl">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="input-primary"
              placeholder="نام کاربری خود را انتخاب کنید"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2" dir="rtl">
              شماره تلفن
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-primary"
              placeholder="شماره تلفن خود را وارد کنید"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2" dir="rtl">
              رمز عبور
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-primary"
              placeholder="رمز عبور خود را انتخاب کنید"
              required
              minLength={6}
              dir="rtl"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2" dir="rtl">
              تأیید رمز عبور
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (passwordError) {
                  setPasswordError(null);
                }
              }}
              className="input-primary"
              placeholder="رمز عبور را دوباره وارد کنید"
              required
              dir="rtl"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full"
            dir="rtl"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                در حال ثبت نام...
              </div>
            ) : (
              'ثبت نام'
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600" dir="rtl">
            قبلاً ثبت نام کرده‌اید؟{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
            >
              وارد شوید
            </button>
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}