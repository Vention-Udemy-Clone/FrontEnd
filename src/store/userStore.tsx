import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (userData) => set({ user: userData }),
        removeUser: () => set({ user: null }),
      }),
      { name: "userStore" }
    )
  )
);

export default useUserStore;
