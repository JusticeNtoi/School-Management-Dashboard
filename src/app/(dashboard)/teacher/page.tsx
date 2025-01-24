import Announcements from "@/components/announcements"
import BigCalendar from "@/components/bigCalendar"
import EventCalendar from "@/components/eventCalendar"

const TeacherPage = () => {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */ }
      <div className="w-full xl:w-2/3 flex flex-col gap-8">
        <div className="h-full bg-white p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold">Schedule (4A)</h1>
          </div>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */ }
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  )
}

export default TeacherPage