"use client"

import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
    {
        id: 1,
        title: "Math Class - Algebra Basics",
        time: "9:00 AM - 10:30 AM",
        description: "Introduction to algebra, covering variables, expressions, and equations.",
    },
    {
        id: 2,
        title: "Science Lab - Physics Experiment",
        time: "11:00 AM - 12:00 PM",
        description: "Hands-on experiment on Newton's Laws of Motion. Bring lab notebooks.",
    },
    {
        id: 3,
        title: "Parent-Teacher Meeting",
        time: "1:00 PM - 2:30 PM",
        description: "Discussion on student progress and upcoming school events.",
    },
];


const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className="bg-white p-4 rounded-xl">
            <Calendar onChange={ onChange } value={ value } />
            <div className="flex items-center justify-between my-4">
                <h1 className="text-lg font-semibold">Events</h1>
                <Image src="/moreDark.png" alt="" width={ 20 } height={ 20 } />
            </div>
            <div className="flex flex-col gap-4">
                { events.map(event => (
                    <div
                        className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-colorSky even:border-t-colorPurple"
                        key={ event.id }
                    >
                        <div className="flex items-center justify-between gap-x-2">
                            <h1 className="font-semibold text-gray-600">{ event.title }</h1>
                            <span className="text-gray-400 text-xs">{ event.time }</span>
                        </div>
                        <p className="mt-2 text-gray-500 text-base">{ event.description }</p>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default EventCalendar