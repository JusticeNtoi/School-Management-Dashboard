"use server";

import { revalidatePath } from "next/cache";
import { SubjectInput } from "./formValidationSchemas";
import { prisma } from "./prisma";

type CurrentState = { success: boolean; error: boolean };

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectInput
) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        // teachers: {
        //   connect: data.teachers.map((teacherId) => ({ id: teacherId })),
        // },
      },
    });

    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
