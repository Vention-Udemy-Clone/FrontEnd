import { Fragment, useEffect } from "react";

import { useThemeStore } from "@/store/useThemeStore";

type ThemeProviderProps = { children: React.ReactNode };

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return <Fragment>{children}</Fragment>;
}
