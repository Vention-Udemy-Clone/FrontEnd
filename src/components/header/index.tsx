import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import GoogleLoginButton from "../googleAuth";
import { ModeToggle } from "../ModeToggle";
import SvgIcon from "../SvgIcon";

export const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 border-b bg-background">
      <div className="container flex items-center justify-between py-2">
        <Link to="/">
          <SvgIcon name="logo" className="h-8 w-16 text-foreground" />
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MagnifyingGlassIcon className="h-5 w-5" />
            Search
          </div>

          <Separator orientation="vertical" className="mx-2 h-6" />

          <ModeToggle styles="hidden sm:block" />
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
            <GoogleLoginButton />
          </GoogleOAuthProvider>
        </div>
      </div>
    </header>
  );
};
