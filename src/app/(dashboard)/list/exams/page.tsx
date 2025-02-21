import FormModal from "@/components/formModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { formatDateToLocal, ITEM_PER_PAGE } from "@/lib/utils";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type ExamList = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-colorPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <h3 className="font-semibold">{item.lesson.subject.name}</h3>
    </td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell">
      {formatDateToLocal(item.startTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="exams" type="update" data={item} />
            <FormModal table="exams" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const ExamsListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.ExamWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = { classId: parseInt(value) };
            break;
          case "teacherId":
            query.lesson = { teacherId: value };
            break;
          case "search":
            query.lesson = {
              subject: {
                name: { contains: value, mode: "insensitive" },
              },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  const [examsData, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.exam.count({ where: query }),
  ]);

  return (
    <div className="bg-white rounded-xl flex-1 p-4 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={"/filter.png"} alt={""} width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={"/sort.png"} alt={""} width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="exams" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={examsData} />
      {/* PAGINATION */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
};

export default ExamsListPage;
