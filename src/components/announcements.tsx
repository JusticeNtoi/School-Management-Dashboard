import { prisma } from "@/lib/prisma";
import { formatDateToLocal } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  const announcementsData = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });

  function clsx(arg0: string): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Announcements</h1>
        <span className="text-sm text-gray-400">View all</span>
      </div>
      <div className="flex flex-col gap-4">
        {announcementsData.map((announcement, index) => {
          const colors = [
            "bg-colorSkyLight",
            "bg-colorPurpleLight",
            "bg-colorYellowLight",
          ];
          const bgColor =
            colors[index === announcementsData.length - 1 ? 2 : index % 2];

          return (
            <div key={announcement.id} className={`rounded-md p-4 ${bgColor}`}>
              <div className="flex items-center justify-between gap-x-2">
                <h2 className="font-medium">{announcement.title}</h2>
                <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                  {formatDateToLocal(announcement.date)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {announcement.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Announcements;
