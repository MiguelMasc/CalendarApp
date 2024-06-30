"use client";

import { ChevronLeft, ChevronRight, MenuIcon } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type TopBarProps = {
  isNavCollapsed: boolean;
  setIsNavCollapsed: (isCollapsed: boolean) => void;
  viewDate: Date;
  setViewDate: (inView: Date | undefined) => void;
};

const TopBar = ( {setIsNavCollapsed, isNavCollapsed, viewDate, setViewDate}: TopBarProps) => {

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const resetView = () => {
    setViewDate(new Date);
  };

  // const handleCalDec = () => {
  //   if ()
  // }

  // const handleCalInc = () => {

  // }

  return (
    <div className="z-50 bg-background top-0 items-center justify-between flex w-full p-6">
      <div className="flex items-center justify-center gap-x-5">  
        <Button variant="round" onClick={() => {}}> 
          <MenuIcon onClick={toggleNav}/>
        </Button>
        <Logo/>
        <Button className="text-blue-700 dark:text-blue-300" variant="outline" onClick={resetView}>
          Today
        </Button>
        <Button variant="blueghost" size="xs">
          <ChevronLeft /*onClick={handleCalDec}*//> 
        </Button>
        <Button variant="blueghost" size="xs">
          <ChevronRight /*onClick={handleCalInc}*//>
        </Button>
        <p className="font-semibold text-blue-700 dark:text-blue-300">{viewDate.toLocaleString('default', {month: 'long'})} {viewDate.getFullYear()}</p>
      </div>
      <div className="flex items-center gap-x-5 justify-end">
        {/* insert view mode picker */}
        <Select>
          <SelectTrigger className="w-[100]">
            <SelectValue placeholder="View Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Day">Day</SelectItem>
            <SelectItem value="Week">Week</SelectItem>
            <SelectItem value="Month">Month</SelectItem>
            <SelectItem value="Year">Year</SelectItem>
          </SelectContent>
        </Select>
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
    </div>
  )
};

export default TopBar;