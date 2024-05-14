import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full flex items-center px-16 py-4 bg-white border-b border-gray-200 z-50">
      <span>Logo</span>

      <p className="flex items-center ml-auto gap-2">
        <MagnifyingGlassIcon className="w-5 h-5" />
        <span>Search</span>
      </p>

      <Separator orientation="vertical" className="h-6 mx-6" />

      <p>Log In</p>
    </header>
  );
};
