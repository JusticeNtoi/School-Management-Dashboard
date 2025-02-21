import FormModal from "@/components/formModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/utils";
import { Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type SubjectList = Subject & { teachers: Teacher[] };

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: SubjectList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-colorPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.name}</h3>
    </td>
    <td className="hidden md:table-cell">
      {item.teachers.map((teacher) => teacher.name).join(", ")}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="subjects" type="update" data={item} />
            <FormModal table="subjects" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const SubjectsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [subjectsData, count] = await prisma.$transaction([
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);

  return (
    <div className="bg-white rounded-xl flex-1 p-4 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={"/filter.png"} alt={""} width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={"/sort.png"} alt={""} width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="subjects" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={subjectsData} />
      {/* PAGINATION */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
};

export default SubjectsListPage;
