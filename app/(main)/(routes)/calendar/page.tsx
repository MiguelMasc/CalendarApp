"use client";

import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { useCalendar } from "../../(context)/calendarContext";

const CalendarPage = () => {

  const {viewDate, setViewDate} = useCalendar();
  const weekDays = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="flex">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="p-2 text-center font-semibold text-xs border w-full">
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
    const endDate = addDays(startDate,41);
  
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
        if (date) {
          days.push(
            <div
              key={date.toString()}
              className={`border p-2 text-center font-semibold text-blue-700 dark:text-blue-300 w-full ${
                !isSameMonth(date, viewDate) ? "opacity-60" : ""
              } ${isSameDay(date, new Date()) ? "bg-accent-foreground text-blue-300 dark:text-blue-700" : ""}`}
            >
              {format(date, "d")}
            </div>
          );
        }
      }
      rows.push(<div key={i} className="flex">{days}</div>);
    }
  
    return <div>{rows}</div>;
  };


  return (
    <div className="border rounded-md w-full h-screen">
      {weekDays()}
      {generateDaysGrid()}
    </div>
  );
};

export default CalendarPage;
