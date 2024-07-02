// CalendarContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalendarContextType {
  viewDate: Date;
  setViewDate: (date: Date) => void;
  currDate: Date;
  setCurrDate: (date: Date) => void;
  isNavCollapsed: boolean;
  setIsNavCollapsed: (isIt: boolean) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  openPopoverIndex: number;
  setOpenPopoverIndex: (index: number) => void;
  eventName: string; 
  setEventName: (name: string) => void;
  eventLocation: string; 
  setEventLocation: (location: string) => void;
  eventDesc: string; 
  setEventDesc: (desc: string) => void;
  eventDate: string;
  setEventDate: (Date: string) => void;
  eventAllDay: boolean; 
  setEventAllDay: (allday: boolean) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Month");

  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);

  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDesc, setEventDesc] = useState("Notes");
  const [eventDate, setEventDate] = useState("");
  const [eventAllDay, setEventAllDay] = useState(true);

  return (
    <CalendarContext.Provider value={{ 
      viewDate, 
      setViewDate, 
      currDate,
      setCurrDate,
      isNavCollapsed,
      setIsNavCollapsed,
      viewMode,
      setViewMode,
      openPopoverIndex, 
      setOpenPopoverIndex,
      eventName, 
      setEventName,
      eventLocation, 
      setEventLocation,
      eventDesc, 
      setEventDesc,
      eventDate, 
      setEventDate,
      eventAllDay, 
      setEventAllDay,
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};