import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

import useSignInMutation from "@/mutations/useSignInMutation";
import useGetUserQuery from "@/queries/useGetUserQuery";
import { Login } from "@/types/user.types";
import useUserStore from "@/zustand/userStore";
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

  const { data } = useGetUserQuery();

  console.log("file: index.tsx:29 ~ GoogleLoginButton ~ data:", data);

  const user = useUserStore((state) => state.user);

  const { mutate, isPending } = useSignInMutation();

  console.log("file: index.tsx:29 ~ GoogleLoginButton ~ isPending:", isPending);

  // Access user data from the store
  console.log("User Info:", user);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(false);
      console.log("Logged in successfully:", response);
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });
        const userInfo = await res.json();

        console.log("User Info:", userInfo);
        toast.success("Logged in successfully", {});
        const userData: Login = {
          fullName: userInfo.given_name + " " + userInfo.family_name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        };

        console.log("file: index.tsx:58 ~ onSuccess: ~ userData:", userData);

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
    toast.success("Logged out successfully");
  };

  return (
    <div>
      {data?.id ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-3xl pl-1 pr-3" variant={"outline"}>
                <Avatar className="mr-2 h-7 w-7  ">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <HamburgerMenuIcon className="h-5 w-5 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
          className=" :hover:bg-white-500 rounded-sm"
          onClick={handleGoogleLogin}
          variant={"default"}
          disabled={isLoading}
        >
          <div className="flex items-center justify-center gap-2 ">
            {/* <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#f97316"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
                clipRule="evenodd"
              />
            </svg> */}
            <div>{isLoading ? "Loading..." : "Log In"}</div>
          </div>
        </Button>
      )}
    </div>
  );
}

export default GoogleLoginButton;
