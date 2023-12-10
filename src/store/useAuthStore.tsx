import {create} from 'zustand';

interface AuthState {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authToken: "",
  setAuthToken: (token) => set({ authToken: token }),
}));
