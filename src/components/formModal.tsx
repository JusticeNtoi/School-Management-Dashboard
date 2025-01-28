"use client";

import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/teacherForm";

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teachers"
    | "students"
    | "parents"
    | "subjects"
    | "classes"
    | "lessons"
    | "exams"
    | "assignments"
    | "results"
    | "attendance"
    | "events"
    | "announcements";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-colorYellow"
      : type === "update"
      ? "bg-colorSky"
      : "bg-colorPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type === "delete" && "id" ? (
      <form action="" className="p-4 pt-8 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this RECORD
          from {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 mt-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : (
      <TeacherForm type="create" />
    );
  };

  return (
    <div>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-2xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <div
              className="absolute p-2 top-2 right-2 rounded-md cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
