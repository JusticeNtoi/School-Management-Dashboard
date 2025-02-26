import Announcements from "@/components/announcements";
import BigCalendarContainer from "@/components/bigCalendarContainer";
import EventCalendarContainer from "@/components/eventCalendarContainer";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const ParentPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { userId } = await auth();
  const currentUserId = userId;

  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId!,
    },
  });

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        {students.map((student) => (
          <div className="h-full bg-white p-4 rounded-xl" key={student.id}>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-lg font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
            </div>
            <BigCalendarContainer type={"classId"} id={student.classId} />
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
