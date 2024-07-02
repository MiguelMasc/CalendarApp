"use client";

const weekDays = () => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="flex">
      {daysOfWeek.map((day, index) => (
        <div key={index} className="p-2 font-semibold text-xs border w-full">
          {day}
        </div>
      ))}
    </div>
  );
};

export default weekDays;