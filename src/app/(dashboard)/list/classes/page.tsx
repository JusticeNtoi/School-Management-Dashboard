import FormModal from "@/components/formModal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import TableSearch from "@/components/tableSearch";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { Class, Prisma, Teacher } from "@prisma/client";
import Image from "next/image";

type ClassList = Class & { supervisor: Teacher };

const ClassesListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "Class Name",
      accessor: "name",
    },
    {
      header: "Capacity",
      accessor: "capacity",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Supervisor",
      accessor: "supervisor",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-colorPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <h3 className="font-semibold">{item.name}</h3>
      </td>
      <td>{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden md:table-cell">
        {item.supervisor.name + " " + item.supervisor.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="classes" type="update" data={item} />
              <FormModal table="classes" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const pageNumber = page ? parseInt(page) : 1;

  // URL PARAMS CONDITIONS
  const query: Prisma.ClassWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [classesData, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    prisma.class.count({ where: query }),
  ]);

  return (
    <div className="bg-white rounded-xl flex-1 p-4 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={"/filter.png"} alt={""} width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-colorYellow">
              <Image src={"/sort.png"} alt={""} width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="classes" type="create" />}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={classesData} />
      {/* PAGINATION */}
      <Pagination page={pageNumber} count={count} />
    </div>
  );
};

export default ClassesListPage;
