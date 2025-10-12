export interface User {
  id: string;
  username: string;
  phone: string;
  createdAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}
