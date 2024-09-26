"use client";

import {
  format,
  isSameMonth,
  isSameDay,
  isThisMonth,
} from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCalendar } from "../(context)/calendarContext";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Define the type for the event object
interface Event {
  _id: string;
  name: string;
}

interface Day {
  date: Date;
  index: number;
  events: Event[] | undefined;
}


const DayGrid = ({date, index, events}: Day) => {

    const { 
      eventName, setEventName,
      eventLocation, setEventLocation,
      eventDesc, setEventDesc,
      eventDate, setEventDate,
      eventAllDay, setEventAllDay,
      viewDate,
    } = useCalendar();

    
    const create = useMutation(api.events.create);
    const modify = useMutation(api.events.modify);

    const newEvent = () => {
      const promise = create({
        name: eventName ? eventName : "Untitled", 
        date: eventDate, 
        allDay: eventAllDay, 
        location: eventLocation,
        desc: eventDesc});
    };

    const modifyEvent = (eventId) => {
      const promise = modify({
        id: eventId,
        name: eventName ? eventName : "Untitled", 
        date: eventDate, 
        allDay: eventAllDay, 
        location: eventLocation,
        desc: eventDesc});
    };

  return(

    <div
      onClick={() => ()}
      className={`h-full w-[calc((100vw/7))] flex border flex-col p-2 text-center font-semibold text-blue-700 dark:text-blue-300 ${
        !isSameMonth(date, viewDate) ? "opacity-60" : ""
      } ${isSameDay(date, new Date()) ? "bg-gray-300 text-blue-300 dark:text-blue-700" : ""}`}
    >
      {format(date, "d") === "1" && !isThisMonth(date)
        ? format(date, "LLL d")
        : format(date, "d")}
      <div className="flex-1 mt-1  text-sm overflow-y-auto no-scrollbar">
        {events?.map((event) => (
          <div key={event._id} onClick={() => modifyEvent(event._id)} className="rounded-md text-background m-1 bg-blue-700 dark:bg-blue-300 shadow-md">
            {event.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayGrid;
