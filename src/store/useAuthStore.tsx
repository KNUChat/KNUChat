import { create } from 'zustand';

const jwtToken = import.meta.env.VITE_JWT;

interface AuthState {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authToken: jwtToken || null,
  setAuthToken: (token) => set({ authToken: token }),
}));
