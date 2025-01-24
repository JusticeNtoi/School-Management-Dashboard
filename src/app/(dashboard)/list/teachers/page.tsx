import Pagination from "@/components/pagination"
import TableSearch from "@/components/tableSearch"
import Image from "next/image"

const TeacherListPage = () => {
  return (
    <div className="bg-white rounded-xl flex-1 p-4 m-4 mt-0">
      {/* TOP */ }
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={ "/filter.png" } alt={ "" } width={ 14 } height={ 14 } />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={ "/sort.png" } alt={ "" } width={ 14 } height={ 14 } />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={ "/plus.png" } alt={ "" } width={ 14 } height={ 14 } />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */ }
      <div className=""></div>
      {/* PAGINATION */ }
      <Pagination />
    </div>
  )
}

export default TeacherListPage