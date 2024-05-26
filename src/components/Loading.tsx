import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/15 transition-opacity duration-150  
      ease-in-out"
    >
      <div className="animate-spin text-white">
        <LoaderCircle size="50px" />
      </div>
    </div>
  );
};
