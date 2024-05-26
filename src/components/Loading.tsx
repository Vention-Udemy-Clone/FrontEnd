import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div
      className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/20 transition-opacity duration-150  
      ease-in-out"
    >
      <div className="animate-spin text-white">
        <LoaderCircle size="50px" />
      </div>
    </div>
  );
};