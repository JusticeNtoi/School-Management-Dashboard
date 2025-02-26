import Announcements from "@/components/announcements";
import BigCalendarContainer from "@/components/bigCalendarContainer";
import EventCalendarContainer from "@/components/eventCalendarContainer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = async ({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) => {
  const { userId } = await auth();

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        <div className="h-full bg-white p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">Schedule (4A)</h1>
          </div>
          <BigCalendarContainer type={"teacherId"} id={userId!} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
