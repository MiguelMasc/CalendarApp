"use client";

import { ChevronLeft, ChevronRight, MenuIcon } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/clerk-react";


// handle the navbar resize on menu click
// 
const TopBar = () => {
  return (
    <div className="z-50 bg-background top-0 items-center justify-between flex w-full p-6">
      <div className="flex items-center justify-center gap-x-5">  
        <Button variant="round" onClick={() => {}}> 
          <MenuIcon/>
        </Button>
        <Logo/>
        <Button className="text-blue-700 dark:text-blue-300" variant="outline">
          Today
        </Button>
        <Button variant="blueghost" size="xs">
          <ChevronLeft/>
        </Button>
        <Button variant="blueghost" size="xs">
          <ChevronRight/>
        </Button>
      </div>
      <div className="flex items-center justify-center gap-x-5">
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
    </div>
  )
};

export default TopBar;