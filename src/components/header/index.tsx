import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

export const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 flex w-full items-center border-b border-gray-200 bg-white px-16 py-4">
      <span>Logo</span>

      <p className="ml-auto flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5" />
        <span>Search</span>
      </p>

      <Separator orientation="vertical" className="mx-6 h-6" />

      <p>Log In</p>
    </header>
  );
};
