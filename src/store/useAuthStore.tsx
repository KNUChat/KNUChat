import {create} from 'zustand';

interface AuthState {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authToken: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMSIsImV4cCI6MTcwMjIyNDgzMX0.SJnHqiMuqRZ1YoTFgpzh4kYIj4j0JcjJcwCxUgLSAfPsyJrR7zQdGT7Iujx5RTa0AuL-Eu-CRMcNZ2bwsC9Ekg",
  setAuthToken: (token) => set({ authToken: token }),
}));
