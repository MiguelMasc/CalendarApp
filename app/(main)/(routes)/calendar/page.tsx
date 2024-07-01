"use client";

import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isThisMonth,
} from "date-fns";
import { useCalendar } from "../../(context)/calendarContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FormInput } from "lucide-react";
import { Button } from "@/components/ui/button";

const CalendarPage = () => {
  const { viewDate, setViewDate } = useCalendar();
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);

  // const [eventDate, setEventDate] = useState();
  // const [eventName, setEventName] = useState();
  // const [eventDesc, setEventDesc] = useState();

  const create = useMutation(api.events.create);

  const newEvent = (date: Date) => {
    console.log('new event');
    const promise = create({name: "Untitled", date: date.toDateString(), hours: "All Day"})
  };

  const handleOpenPopover = (index: number) => {
    setOpenPopoverIndex(index);
  };

  const handleClosePopover = () => {
    setOpenPopoverIndex(null);
  };

  const weekDays = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="flex">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="p-2 font-semibold text-xs border w-[calc((100vw))]">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const generateDaysGrid = () => {
    const monthStart = startOfMonth(viewDate);
    const monthEnd = endOfMonth(viewDate);
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
          const events = useQuery(api.events.getByDay, {date: date.toDateString()});
          days.push(
            <Popover key={date.toString()} onOpenChange={(isOpen) => isOpen ? handleOpenPopover(index) : handleClosePopover()}>
              <PopoverTrigger asChild>
                <div
                  className={`h-full w-[calc((100vw/7))] flex border flex-col p-2 text-center font-semibold text-blue-700 dark:text-blue-300 ${
                    !isSameMonth(date, viewDate) ? "opacity-60" : ""
                  } ${isSameDay(date, new Date()) ? "bg-gray-300 text-blue-300 dark:text-blue-700" : ""}`}
                >
                  {format(date, "d") === "1" && !isThisMonth(date)
                    ? format(date, "LLL d")
                    : format(date, "d")}
                  <div className="overflow-y-auto flex-1 mt-1">
                    {openPopoverIndex === index 
                      ? "Popover open" 
                      : ""}
                    {events?.map((event) => (
                      <p key={event._id}>{event.name}</p>
                    ))}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="shadow-lg">
                <div className="text-blue-700 dark:text-blue-300 font-semibold rounded-md">
                  <p>{format(date, "PP")}</p>
                  <Button variant="blue" onClick={() => newEvent(date)}>Add Event</Button>
                </div>
              </PopoverContent>
            </Popover>
          );
        }
      }
      rows.push(
        <div key={i} className="flex flex-1 max-h-[calc((100vh)/7)] h-full overflow-y-hidden">
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
