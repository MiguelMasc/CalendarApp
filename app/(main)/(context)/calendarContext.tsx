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
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Month");

  return (
    <CalendarContext.Provider value={{ 
      viewDate, 
      setViewDate, 
      currDate,
      setCurrDate,
      isNavCollapsed,
      setIsNavCollapsed,
      viewMode,
      setViewMode
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