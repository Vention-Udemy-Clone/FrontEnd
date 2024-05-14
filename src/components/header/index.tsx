import { IoMdSearch } from 'react-icons/io';
import { Separator } from '@/components/ui/separator';

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full flex items-center px-16 py-4">
      <span>Logo</span>

      <p className="flex items-center ml-auto gap-2">
        <IoMdSearch fontSize={'25px'} />
        <span>Search</span>
      </p>

      <Separator orientation="vertical" className="h-6 mx-6" />

      <p>Log In</p>
    </header>
  );
};
