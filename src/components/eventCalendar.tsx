// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// type ValuePiece = Date | null;

// type Value = ValuePiece | [ValuePiece, ValuePiece];

// const EventCalendar = () => {
//   const [value, onChange] = useState<Value>(new Date());

//   const router = useRouter();

//   useEffect(() => {
//     if (value instanceof Date) {
//       const formattedDate = value.toLocaleDateString("en-ZA");
//       router.push(`?date=${formattedDate}`);
//     }
//   }, [value, router]);

//   return <Calendar onChange={onChange} value={value} />;
// };

// export default EventCalendar;

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, setValue] = useState<Value>(new Date());
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const router = useRouter();

  // Handle date change
  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
    setIsUserInteracted(true); // Mark that user has interacted
  };

  useEffect(() => {
    if (isUserInteracted && value instanceof Date) {
      const formattedDate = value.toLocaleDateString("en-ZA");
      router.push(`?date=${formattedDate}`);
    }
  }, [value, isUserInteracted, router]);

  return <Calendar onChange={handleDateChange} value={value} />;
};

export default EventCalendar;
