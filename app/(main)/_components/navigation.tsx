"use client";

import { Calendar } from "@/components/ui/calendar"
import { useCalendar } from "../(context)/calendarContext";


const Navigation = () => {

  const {isNavCollapsed, viewDate, setViewDate} = useCalendar();

  return ( 
    <>
      {!isNavCollapsed && (
        <div className="h-full">
          <Calendar
            mode="single"
            selected={viewDate}
            onSelect={(date) => {
              if (date) {
                setViewDate(date);
              }
            }}
          />
        </div>
      )}
    </>
   )
}
 
export default Navigation;