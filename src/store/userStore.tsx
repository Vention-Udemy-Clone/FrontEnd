import create from "zustand";

interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
}

interface UserState {
  user: User | null;
  setUser: (userData: User) => void;
  removeUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  removeUser: () => set({ user: null }),
}));

export default useUserStore;
