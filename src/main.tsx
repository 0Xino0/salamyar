import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LandingPage from './components/LandingPage.tsx';
import './index.css';
import { AuthProvider } from './hooks/useAuth.tsx';

const path = window.location.pathname;
const isLanding = path === '/' || path === '/landing';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      {isLanding ? <LandingPage /> : <App />}
    </AuthProvider>
  </StrictMode>
);
