import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  token?: string;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: undefined,
      login: (token) => {
        set({ token });
      },
      logout: () => {
        set({ token: undefined });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
