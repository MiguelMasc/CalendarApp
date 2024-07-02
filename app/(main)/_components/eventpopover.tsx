"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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

// Define the prop types for EventPopover
interface EventPopoverProps {
  date: Date;
  index: number;
  events: Event[] | undefined;
}



const EventPopover = ({date, index, events}: EventPopoverProps) => {

  const { 
    eventName, setEventName,
    eventLocation, setEventLocation,
    eventDesc, setEventDesc,
    eventDate, setEventDate,
    eventAllDay, setEventAllDay,
    openPopoverIndex, setOpenPopoverIndex,
    viewDate,
   } = useCalendar();

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
    setEventAllDay(true);
  };

  const handleClosePopover = () => {
    setOpenPopoverIndex(-1);
    setEventName("");
    setEventDesc("");
  };

  return(
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
              className="mt-2 mb-2 font-normal"
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
};

export default EventPopover;
