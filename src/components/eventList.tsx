import { prisma } from "@/lib/prisma";
import { formatTimeToLocal } from "@/lib/utils";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });

  return data.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-colorSky even:border-t-colorPurple"
      key={event.id}
    >
      <div className="flex items-center justify-between gap-x-2">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-400 text-xs">
          {formatTimeToLocal(event.startTime)}
          {" - "}
          {formatTimeToLocal(event.endTime)}
        </span>
      </div>
      <p className="mt-2 text-gray-500 text-base">{event.description}</p>
    </div>
  ));
};

export default EventList;
