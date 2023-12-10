// AuthStore.ts

import create from 'zustand';

interface AuthState {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMiIsImV4cCI6MTcwMjIyMjAwMX0.Fx__s1vjnXgxFeE-kxcA0cTivVZl7TECTJatic-NX4Uz3WX-_D0cUmIyPYdprNZtATJuSpb6TAOyD2_MgPBdBw",
  setAuthToken: (token) => set({ authToken: token }),
}));
