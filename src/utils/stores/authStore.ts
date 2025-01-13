import Cookies from 'js-cookie';
import { create } from 'zustand';

export const ACCESS_TOKEN = 'thisisjustarandomstring';

interface AuthState {
  auth: {
    user: User | null;
    setUser: (user: User | null) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
    resetAccessToken: () => void;
    reset: () => void;
  };
}

export const useAuthStore = create<AuthState>()((set) => {
  const cookieState = Cookies.get(ACCESS_TOKEN);
  const initToken = cookieState ? JSON.parse(cookieState) : '';
  return {
    auth: {
      user: {
        id: 1,
        first_name: 'Mahkambek',
        last_name: 'Satimov',
        phone_number: '+998901234567'
      },
      setUser: (user) => set((state) => ({ ...state, auth: { ...state.auth, user } })),
      accessToken: initToken,
      setAccessToken: (accessToken) =>
        set((state) => {
          Cookies.set(ACCESS_TOKEN, JSON.stringify(accessToken));
          return { ...state, auth: { ...state.auth, accessToken } };
        }),
      resetAccessToken: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN);
          return { ...state, auth: { ...state.auth, accessToken: '' } };
        }),
      reset: () =>
        set((state) => {
          Cookies.remove(ACCESS_TOKEN);
          return {
            ...state,
            auth: { ...state.auth, user: null, accessToken: '' }
          };
        })
    }
  };
});

export const useAuth = () => useAuthStore((state) => state.auth);
