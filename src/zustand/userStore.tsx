import create from 'zustand';

interface User {
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (userData: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
}));

export default useUserStore;
