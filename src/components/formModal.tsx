"use client";

import { deleteSubject } from "@/lib/actions/subjectActions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./formContainer";
import { deleteClass, deleteTeacher } from "@/lib/actions";

const TeacherForm = dynamic(() => import("./forms/teacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/studentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ParentForm = dynamic(() => import("./forms/parentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/subjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/classForm"), {
  loading: () => <h1>Loading...</h1>,
});
const LessonForm = dynamic(() => import("./forms/lessonForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/examForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AssignmentForm = dynamic(() => import("./forms/assignmentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ResultForm = dynamic(() => import("./forms/resultForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AttendanceForm = dynamic(() => import("./forms/attendanceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const EventForm = dynamic(() => import("./forms/eventForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AnnouncementForm = dynamic(() => import("./forms/announcementForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    type: "create" | "update",
    setOpen: Dispatch<SetStateAction<boolean>>,
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  teacher: (type, setOpen, data, relatedData) => (
    <TeacherForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  student: (type, setOpen, data, relatedData) => (
    <StudentForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  parent: (type, setOpen, data, relatedData) => (
    <ParentForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  subject: (type, setOpen, data, relatedData) => (
    <SubjectForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  class: (type, setOpen, data, relatedData) => (
    <ClassForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  lesson: (type, setOpen, data, relatedData) => (
    <LessonForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  exam: (type, setOpen, data, relatedData) => (
    <ExamForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  assignment: (type, setOpen, data, relatedData) => (
    <AssignmentForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  result: (type, setOpen, data, relatedData) => (
    <ResultForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  attendance: (type, setOpen, data, relatedData) => (
    <AttendanceForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  event: (type, setOpen, data, relatedData) => (
    <EventForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
  announcement: (type, setOpen, data, relatedData) => (
    <AnnouncementForm
      type={type}
      setOpen={setOpen}
      data={data}
      relatedData={relatedData}
    />
  ),
};

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteSubject,
  exam: deleteSubject,
  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
  // student: deleteStudent,
  // exam: deleteExam,
  // parent: deleteParent,
  // lesson: deleteLesson,
  // assignment: deleteAssignment,
  // result: deleteResult,
  // attendance: deleteAttendance,
  // event: deleteEvent,
  // announcement: deleteAnnouncement,
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-colorYellow"
      : type === "update"
      ? "bg-colorSky"
      : "bg-colorPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);
    // }, [state, router, type, setOpen]);

    return type === "delete" && "id" ? (
      <form action={formAction} className="p-4 pt-8 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this RECORD
          from {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 mt-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](type, setOpen, data, relatedData)
    ) : (
      "Form not found!"
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
