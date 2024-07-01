"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import TopBar from "./_components/topbar";
import { useState } from "react";
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
        <div className="flex">
          <main className="flex overflow-y-hidden w-full border">
            {/* <Navigation /> */}
            {children}
          </main>
        </div>
      </div>
    </CalendarProvider>
   );
}
 
export default MainLayout;