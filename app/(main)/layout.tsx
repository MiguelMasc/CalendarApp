"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import TopBar from "./_components/topbar";


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
    <div>
      <TopBar />
      <div className="h-full flex">
        <main className="flex h-full overflow-y-auto">
          <Navigation />
          {children}
        </main>
      </div>
    </div>
   );
}
 
export default MainLayout;