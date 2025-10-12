import type { User, LoginRequest, RegisterRequest, AuthResponse } from '../types/User.ts';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export class AuthError extends Error {
  field?: string;
  
  constructor(message: string, field?: string) {
    super(message);
    this.name = 'AuthError';
    this.field = field;
  }
}

const handleAuthResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new AuthError(errorData.message || 'خطا در عملیات احراز هویت', errorData.field);
  }
  return response.json();
};

export const authApi = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return handleAuthResponse<AuthResponse>(response);
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return handleAuthResponse<AuthResponse>(response);
  },

  // Logout user
  logout: async (): Promise<{ message: string }> => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return handleAuthResponse<{ message: string }>(response);
  },

  // Get current user
  getCurrentUser: async (): Promise<{ user: User }> => {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleAuthResponse<{ user: User }>(response);
  },
};
