"use client";

import { Calendar } from "@/components/ui/calendar"
import { useCalendar } from "../(context)/calendarContext";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


type CalendarType = {
  _id: string;
  name: string;
};

function GetCalendars() {
  const calendars = useQuery(api.calendars.get);
  return calendars as CalendarType[] | undefined;
};

const Navigation = () => {

  const {isNavCollapsed, viewDate, setViewDate} = useCalendar();
  const calendars = GetCalendars();

  return ( 
    <>
      {!isNavCollapsed && (
        <div className="h-full max-h-[calc((100vh)/6)] hidden sm:flex flex-col">
          <Calendar
            mode="single"
            selected={viewDate}
            onSelect={(date) => {
              if (date) {
                setViewDate(date);
              }
            }}
          />
          {calendars?.map((calendar) => (
              <div key={calendar._id} className="rounded-md text-background m-1 bg-blue-700 dark:bg-blue-300 shadow-md">{calendar.name}</div>
              ))}
        </div>
      )}
    </>
   )
}
 
export default Navigation;