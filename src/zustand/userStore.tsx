import create from "zustand";

interface User {
  fullName: string;
  email: string;
  avatarUrl: string;
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
