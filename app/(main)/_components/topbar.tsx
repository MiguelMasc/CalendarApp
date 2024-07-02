"use client";

import { ChevronLeft, ChevronRight, MenuIcon } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/clerk-react";
import { useCalendar } from "../(context)/calendarContext";
import { addMonths, subMonths } from "date-fns";


const TopBar = () => {

  const {setIsNavCollapsed, isNavCollapsed, viewDate, setViewDate, viewMode, setViewMode} = useCalendar();
  const views = ["Day", "Week", "Month", "Year"]
  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const resetView = () => {
    setViewDate(new Date);
  };

  const handleCalDec = () => {
    setViewDate(subMonths(viewDate, 1))
  }

  const handleCalInc = () => {
    setViewDate(addMonths(viewDate, 1))

  }

  return (
    <div className="z-50 bg-background top-0 items-center justify-between flex w-full p-6">
      <div className="flex items-center justify-center gap-x-5">  
        <Button 
          variant="round" 
          onClick={toggleNav}
          className="md:flex hidden"
        > 
          <MenuIcon/>
        </Button>
        <Button 
          variant="ghost" 
          className="hover:bg-transparent hidden md:flex "
        >
          <Logo/>
        </Button>
        <Button 
          className="text-blue-700 dark:text-blue-300" 
          variant="outline" 
          onClick={resetView}
        >
          Today
        </Button>
        <Button variant="blueghost" size="xs">
          <ChevronLeft onClick={handleCalDec}/> 
        </Button>
        <Button variant="blueghost" size="xs">
          <ChevronRight onClick={handleCalInc}/>
        </Button>
        <p className="font-semibold text-blue-700 dark:text-blue-300">{viewDate.toLocaleString('default', {month: 'long'})} {viewDate.getFullYear()}</p>
      </div>
      <div className="flex items-center gap-x-5 justify-end">
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
    </div>
  )
};

export default TopBar;