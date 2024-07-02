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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


const CalendarPage = () => {
  const { viewDate, setViewDate } = useCalendar();
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);

  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDesc, setEventDesc] = useState("Notes");
  const [eventDate, setEventDate] = useState("");
  const [eventAllDay, setEventAllDay] = useState(true);

  const create = useMutation(api.events.create);

  const newEvent = () => {
    const promise = create({
      name: eventName ? eventName : "Untitled", 
      date: eventDate, 
      allDay: eventAllDay, 
      location: eventLocation,
      desc: eventDesc});
  };

  const handleOpenPopover = (date: string, index: number) => {
    setOpenPopoverIndex(index);
    setEventDate(date);
  };

  const handleClosePopover = () => {
    setOpenPopoverIndex(-1);
    setEventName("");
    setEventDesc("");
  };

  function GetDayEvents(date: Date) {
    const events = useQuery(api.events.getByDay, {date: format(date, "EEEE LLL dd y")});
    return events;
  }

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
          const events = GetDayEvents(date);
          days.push(
            <Popover key={date.toString()} onOpenChange={(isOpen) => isOpen ? handleOpenPopover(format(date, "EEEE LLL dd y"), index) : handleClosePopover()}>
              <PopoverTrigger asChild>
                <div
                  className={`h-full w-[calc((100vw/7))] flex border flex-col p-2 text-center font-semibold text-blue-700 dark:text-blue-300 ${
                    !isSameMonth(date, viewDate) ? "opacity-60" : ""
                  } ${isSameDay(date, new Date()) ? "bg-gray-300 text-blue-300 dark:text-blue-700" : ""}`}
                >
                  {format(date, "d") === "1" && !isThisMonth(date)
                    ? format(date, "LLL d")
                    : format(date, "d")}
                  <div className="flex-1 mt-1  text-sm overflow-y-auto no-scrollbar">
                    <div className="rounded-md text-background m-1 bg-blue-700 dark:bg-blue-300 shadow-md">
                      {openPopoverIndex === index 
                      ? "New Event" 
                      : ""}
                    </div>
                    {events?.map((event) => (
                      <div key={event._id} className="rounded-md text-background m-1 bg-blue-700 dark:bg-blue-300 shadow-md">{event.name}</div>
                    ))}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="shadow-lg">
                <div className="font-normal rounded-md flex flex-col">
                  <Input 
                    type="name" 
                    placeholder="Untitled" 
                    className="mt-2 mb-2 font-normal" 
                    onChange={(e) => setEventName(e.target.value)}/>
                  <Input 
                    type="location" 
                    placeholder="Location" 
                    className="mt-2 mb-2 font-normal" 
                    onChange={(e) => setEventLocation(e.target.value)}/>
                  <div className="flex flex-row items-center justify-between ">
                    <Label htmlFor="all-day" className="ml-2">All Day</Label>
                    <Switch 
                      id="All Day"
                      checked={eventAllDay}
                      onCheckedChange={() => setEventAllDay(!eventAllDay)}/>
                  </div>
                  <Textarea 
                    placeholder={eventDesc} 
                    className="mt-2 mb-2 text-black font-normal"
                    onChange={(e) => setEventDesc(e.target.value)}/>
                  {!eventName && (
                    <Button disabled variant="blue" onClick={() => newEvent()}>Add Event</Button>
                  )}
                  {eventName && (
                    <Button variant="blue" onClick={() => newEvent()}>Add Event</Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          );
        }
      }
      rows.push(
        <div key={i} className="flex flex-1 max-h-[calc((100vh)/6)] h-full overflow-y-hidden">
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
