// TEMPORARY
const announcements = [
  {
    id: 1,
    title: "Exam Schedule Released",
    date: "2025-01-01",
    description:
      "The exam schedule for the upcoming semester has been released. Please check the academic portal for details.",
    bgColor: "bg-colorSkyLight",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2025-01-10",
    description:
      "A parent-teacher meeting is scheduled to discuss student progress. Please RSVP through the portal.",
    bgColor: "bg-colorPurpleLight",
  },
  {
    id: 3,
    title: "Sports Day Announcement",
    date: "2025-01-15",
    description:
      "Join us for the annual sports day event. Participate in exciting activities and cheer for your team!",
    bgColor: "bg-colorYellowLight",
  },
];

const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Announcements</h1>
        <span className="text-sm text-gray-400">View all</span>
      </div>
      <div className="flex flex-col gap-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`${announcement.bgColor} rounded-md p-4`}
          >
            <div className="flex items-center justify-between gap-x-2">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md p-1">
                {announcement.date}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {announcement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
