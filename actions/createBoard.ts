"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const CreateBoard = z.object({
  title: z
    .string()
    .min(3, { message: "Minimum Length of 3 Letters Is ``Required" }),
});

export type State = {
  error?: {
    title?: string[];
  };
  message?: string | null;
};

export async function createBoard(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields",
    };
  }
  const { title } = validatedFields.data;
try{
    await db.board.create({
        data: {
          title,
        },
      });
}
catch(err){
    console.log(err)
   return {
    message:"Database error"
   }
}

  revalidatePath("/organization/org_2sP1gzn4lgXTqnSQuVfAyzoED5q");
  redirect("/organization/org_2sP1gzn4lgXTqnSQuVfAyzoED5q");
}
