"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  startOfWeek,
  addDays,
} from "date-fns";
import { useCalendar } from "../../(context)/calendarContext";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import weekDays from "../../_components/weekdays";
import EventPopover from "../../_components/eventpopover";
import { Divide } from "lucide-react";


const CalendarPage = () => {
  const { 
    viewDate
  } = useCalendar();

  function GetDayEvents(date: Date) {
    const events = useQuery(api.events.getByDay, {date: format(date, "EEEE LLL dd y")});
    return events;
  };

  const generateDaysGrid = () => {
    const monthStart = startOfMonth(viewDate);
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(startDate, 41);

    const calendarDays = [];

    let day = startDate;

    while (day <= endDate) {
      calendarDays.push(day);
      day = addDays(day, 1);
    }

    const rows = [];
    for (let i = 0; i < 6; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        const date = calendarDays[i * 7 + j];
        const index = i * 7 +j;

        if (date) {
          const events = GetDayEvents(date);
          days.push( 
              <EventPopover             
                key={date.toString()}
                date={date}
                index={index}
                events={events}/>
          );
        }
      }
      rows.push(
        <div key={i} className="flex flex-1 max-h-[calc((100vh)/6)] h-full overflow-y-hidden w-full">
          {days}
        </div>
      );
    }

    return <div className="flex flex-col flex-1">{rows}</div>;
  };

  return (
    <div className="border rounded-md w-full h-[calc(100vh-90px)] flex flex-col">
      {weekDays()}
      {generateDaysGrid()}
    </div>
  );
};

export default CalendarPage;
