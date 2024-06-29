"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading = () => {
  return ( 
    <div className="max-w-3xl space-y-4 dark:text-blue-300 text-blue-700">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        <span>calendarApp</span>
        <br /> 
        Schedule Now.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Calendar App to practice things.
      </h3>
      <Button variant="blue">
        Start
        <ArrowRight className="h-4 w-4 ml-2"/>
      </Button> 
    </div>
   );
}
 
export default Heading;