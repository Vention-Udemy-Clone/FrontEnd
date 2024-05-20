import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

import { LOCAL_STORAGE_KEYS } from "@/config/local-storage.config";
import { removeFromLocalStorage } from "@/lib/utils";
import useSignInMutation from "@/mutations/useSignInMutation";
import useGetUserQuery from "@/queries/useGetUserQuery";
import useUserStore from "@/store/userStore";
import { Login } from "@/types/user.types";
import { ModeToggle } from "../ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function GoogleLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const { isFetching } = useGetUserQuery();

  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);

  const { mutate, isPending } = useSignInMutation();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(false);
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        const userInfo = await res.json();

        const userData: Login = {
          fullName: userInfo.given_name + " " + userInfo.family_name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        };
        mutate(userData);
      } catch (error) {
        toast.error("Login failed", {});
      }
    },
    onError: (error) => {
      setIsLoading(false);
      console.error("Login error:", error);
      toast.error("Login failed", {});
    },
    onNonOAuthError: () => {
      setIsLoading(false);
    },
  });

  const handleGoogleLogin = () => {
    setIsLoading(true);
    login();
  };

  const handleLogOut = () => {
    removeFromLocalStorage(LOCAL_STORAGE_KEYS.sub);
    removeFromLocalStorage(LOCAL_STORAGE_KEYS.accessToken);
    removeUser();
    toast.success("Logged out successfully");
  };

  return (
    <div>
      {user?.id ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-3xl pl-1 pr-3 hover:border-primary active:border-primary"
                variant={"outline"}
              >
                <Avatar className="mr-2 h-7 w-7  ">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <HamburgerMenuIcon className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>
                <div className="flex items-center justify-between">
                  <p>My Account</p>
                  <ModeToggle styles="block sm:hidden" />
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <span>Team</span>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <span>New Team</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                <ExitIcon className="mr-2 h-5 w-5" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Button
          className=" rounded-sm"
          onClick={handleGoogleLogin}
          variant={"default"}
          disabled={isPending || isFetching || isLoading}
        >
          <div className="flex items-center justify-center gap-2 ">
            <div>{isPending || isFetching || isLoading ? "Loading..." : "Log In"}</div>
          </div>
        </Button>
      )}
    </div>
  );
}

export default GoogleLoginButton;
