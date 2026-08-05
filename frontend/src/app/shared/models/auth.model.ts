export interface User {
  email: string;
}

export interface Session {
  token: string;
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}