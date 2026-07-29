import { create } from "zustand";
import api from "../lib/api";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  referralCode: string;
  walletBalance: number;
  totalROIEarned: number;
  totalLevelIncomeEarned: number;
}

interface RegisterData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  referralCode?: string;
}

interface AuthState {
  user: User | null;
  token: string |null;

  loading: boolean;
  error: string | null;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  register: (
    data: RegisterData
  ) => Promise<void>;

  fetchUser: () => Promise<void>;

  logout: () => void;

  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,

  token: localStorage.getItem("token"),

  loading: false,

  error: null,

  login: async (email, password) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      set({
        token,
      });

      await get().fetchUser();
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message ||
          "Login failed",
      });

      throw err;
    } finally {
      set({
        loading: false,
      });
    }
  },

  register: async (data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await api.post(
        "/auth/register",
        data
      );

      const token = res.data.token;

      localStorage.setItem("token", token);

      set({
        token,
      });

      await get().fetchUser();
    } catch (err: any) {
      set({
        error:
          err.response?.data?.message ||
          "Registration failed",
      });

      throw err;
    } finally {
      set({
        loading: false,
      });
    }
  },

  fetchUser: async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({
          user: null,
          token: null,
        });

        return;
      }

      const res = await api.get("/auth/profile");

      set({
        token,
        user: res.data.user,
      });
    } catch (err) {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      error: null,
    });
  },

  clearError: () =>
    set({
      error: null,
    }),
}));