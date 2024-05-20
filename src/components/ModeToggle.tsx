import { Button } from "@/components/ui/button";
import { setTheme, useThemeStore } from "@/store/useThemeStore";
import { MoonIcon, SunIcon } from "lucide-react";

export function ModeToggle({ styles }: { styles: string }) {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div className={`${styles} `}>
      <Button
        className="rounded-full text-primary hover:border-primary hover:text-primary"
        size="icon"
        variant="outline"
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        {theme === "dark" ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
      </Button>
    </div>
  );
}
