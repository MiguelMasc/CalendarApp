"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import TopBar from "./_components/topbar";
import { useState } from "react";


const MainLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
 
  const { isAuthenticated, isLoading} = useConvexAuth();
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());




  if(isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner  size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/")
  }

  return ( 
    <div className="h-full">
      <TopBar 
        isNavCollapsed={isNavCollapsed}
        setIsNavCollapsed={setIsNavCollapsed}
        viewDate={viewDate}
        setViewDate={(date) => {
          if (date) {
            setViewDate(date)
          }
        }}
      />
      
      <div className="h-full flex">
        <main className="flex h-full overflow-y-auto">
          <Navigation 
            isNavCollapsed={isNavCollapsed}
            viewDate={viewDate}
            setViewDate={(date) => {
              if (date) {
                setViewDate(date)
              }
            }}
          />
          {children}
        </main>
      </div>
    </div>
   );
}
 
export default MainLayout;