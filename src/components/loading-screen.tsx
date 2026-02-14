"use client";

import { config } from "@/lib/utils";
import { cn } from "@/lib/utils";

type LoadingScreenProps = {
  isLoading: boolean;
};

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <h1 className="text-4xl font-bold tracking-widest text-primary">
        {config.brandName}
      </h1>
      <div className="mt-8 h-8 w-8 animate-spin rounded-full border-2 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default LoadingScreen;
