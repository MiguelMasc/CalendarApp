"use client";
import { cn } from "@/lib/utils";
import useScrollTop from "@/hooks/use-scroll-top";
import { useConvexAuth } from "convex/react";
import Image from "next/image";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

const Topbar = () => {
  const scrolled = useScrollTop();

  const { isAuthenticated, isLoading }  = useConvexAuth();
  return ( 
    <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6", scrolled && "border-b shadow-sm")}>
      <Logo/>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        <ModeToggle/>
      </div>
    </div>
   );
}
 
export default Topbar;