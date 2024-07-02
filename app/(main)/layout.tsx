"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import TopBar from "./_components/topbar";
import { CalendarProvider } from "./(context)/calendarContext";


const MainLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
 
  const { isAuthenticated, isLoading} = useConvexAuth();

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
    <CalendarProvider>
      <div className="h-screen">
        <TopBar />
        <div className="flex h-full">
          <Navigation />
          <main className="flex overflow-y-hidden max-w-screen flex-grow">        
            {children}
          </main>
        </div>
      </div>
    </CalendarProvider>
   );
}
 
export default MainLayout;