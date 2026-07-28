import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
} from "lucide-react";

export default function Calendar() {
  const months = [
  "June 2026",
  "July 2026",
  "August 2026",
];

const [monthIndex, setMonthIndex] = useState(1);

  const appointments = [
    {
      date: 2,
      customer: "Rahul Sharma",
      time: "10:00 AM",
    },
    {
      date: 5,
      customer: "Priya Nair",
      time: "12:30 PM",
    },
    {
      date: 8,
      customer: "Amit Patel",
      time: "3:00 PM",
    },
    {
      date: 12,
      customer: "Sneha",
      time: "11:00 AM",
    },
    {
      date: 15,
      customer: "Rohit",
      time: "4:00 PM",
    },
    {
      date: 21,
      customer: "Arjun",
      time: "2:30 PM",
    },
    {
      date: 25,
      customer: "Kiran",
      time: "9:30 AM",
    },
  ];

  const days = Array.from(
    { length: 31 },
    (_, i) => i + 1
  );

  return (
    <div className="space-y-6 p-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            to="/appointments"
            className="mb-3 block text-sm text-slate-400 hover:text-white"
          >
            ← Back to Appointments
          </Link>

          <h1 className="text-3xl font-bold text-white">
            Appointment Calendar
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            View and manage scheduled appointments.
          </p>

        </div>


        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              setMonthIndex(
                monthIndex === 0 ? 0 : monthIndex - 1
              )
            }
            className="rounded-xl border border-slate-700 p-2 hover:border-indigo-500"
          >
            <ChevronLeft size={20} />
          </button>


          <h2 className="text-lg font-semibold text-white">
            {months[monthIndex]}
          </h2>


          <button
            onClick={() =>
              setMonthIndex(
                monthIndex === months.length - 1
                  ? months.length - 1
                  : monthIndex + 1
              )
            }
            className="rounded-xl border border-slate-700 p-2 hover:border-indigo-500"
          >
            <ChevronRight size={20} />
          </button>


        </div>

      </div>



      {/* Week Header */}

      <div className="grid grid-cols-7 gap-4 text-center text-sm font-semibold text-slate-400">

        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>

      </div>



      {/* Calendar */}

      <div className="grid grid-cols-7 gap-4">


        {days.map((day) => {

          const booking = appointments.find(
            (item) => item.date === day
          );


          return (

            <div
              key={day}
              className="min-h-[130px] rounded-2xl border border-slate-800 bg-slate-900 p-3 transition hover:border-indigo-500"
            >

              <div className="mb-3 font-semibold text-white">
                {day}
              </div>


              {booking && (

                <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3">


                  <div className="flex items-center gap-2 text-sm text-indigo-300">

                    <CalendarDays size={15} />

                    <span>
                      {booking.customer}
                    </span>

                  </div>



                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">

                    <Clock size={14} />

                    {booking.time}

                  </div>


                </div>

              )}


            </div>

          );

        })}


      </div>


    </div>
  );
}