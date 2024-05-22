import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
};

const initialState = {
  user: {
    id: "",
    email: "",
    fullName: "",
    avatarUrl: "",
  } as User,
};

export const useUserStore = create<typeof initialState>()(
  devtools(
    persist(() => initialState, { name: "userStore" }),
    { name: "userStore" }
  )
);

export const setUser = (userData: User) => {
  useUserStore.setState({ user: userData });
};

export const removeUser = () => {
  useUserStore.setState({ user: initialState.user });
};
