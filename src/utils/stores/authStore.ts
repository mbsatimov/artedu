import Cookies from 'js-cookie';
import { create } from 'zustand';

const ACCESS_TOKEN = 'thisisjustarandomstring';
const REFRESH_TOKEN = 'alsdkfjaldfalksdfjalkdfjalkfj';

interface AuthState {
  auth: {
    user: User | null;
    setUser: (user: User | null) => void;
    accessToken: string | null;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    refreshToken: string | null;
    setRefreshToken: (refreshToken: string) => void;
    resetRefreshToken: () => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => {
  const accessToken = Cookies.get(ACCESS_TOKEN) || null;
  const refreshToken = Cookies.get(REFRESH_TOKEN) || null;
  return {
    auth: {
      user: null,
      setUser: (user) => set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          Cookies.set(ACCESS_TOKEN, accessToken);
          return { ...state, auth: { ...state.auth, accessToken } };
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN);
          return { ...state, auth: { ...state.auth, accessToken: '' } };
        }),
      refreshToken,
      setRefreshToken: (refreshToken) =>
        set((state) => {
          Cookies.set(REFRESH_TOKEN, refreshToken);
          return { ...state, auth: { ...state.auth, refreshToken } };
        }),
      resetRefreshToken: () =>
        set((state) => {
          Cookies.remove(REFRESH_TOKEN);
          return { ...state, auth: { ...state.auth, refreshToken: '' } };
        }),
      reset: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN);
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: null, refreshToken: null }
          };
        })
    }
  };
});

export const useAuth = () => useAuthStore((state) => state.auth);
