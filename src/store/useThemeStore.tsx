import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Theme = "dark" | "light" | "system";

const initialState = {
  theme: "dark" as Theme,
};

export const useThemeStore = create<typeof initialState>()(
  devtools(
    persist(() => initialState, { name: "themeStore" }),
    { name: "themeStore" }
  )
);

export const setTheme = (theme: Theme) => {
  useThemeStore.setState({ theme });
};
