"use client";

import { cn } from "@/lib/utils";
import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Calendar } from "@/components/ui/calendar"

type NavBarProps = {
  isNavCollapsed: boolean;
  viewDate: Date;
  setViewDate: (inView: Date | undefined) => void;
};

const Navigation = ({isNavCollapsed, viewDate, setViewDate}: NavBarProps) => {

  // const pathname = usePathname();
  // const isMobile = useMediaQuery("(max-width: 768px)");

  // const isResizingRef = useRef(false);
  // const sidebarRef = useRef<ElementRef<"aside">>(null);
  // const navbarRef = useRef<ElementRef<"div">>(null);

  // const [isResetting, setIsResetting] = useState(false);

  // useEffect(() => {
  //   if (isMobile) {
  //     collapse();
  //   } else {
  //     resetWidth();
  //   }
  // }, [isMobile]);

  // useEffect(() => {
  //   if (isMobile) {
  //     collapse();
  //   }
  // }, [pathname, isMobile])

  return ( 
    <>
      {!isNavCollapsed && (
        <div className="max-w-[300px] p-2">
          <Calendar
            mode="single"
            selected={viewDate}
            onSelect={(date) => setViewDate(date)}
            className="rounded-md border max-w-full"
          />
        </div>
      )}
    </>
   )
}
 
export default Navigation;