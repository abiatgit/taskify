"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, id,boardId } = data;
  let list;
  try {

    list = await db.list.update({
      where: {
        id,
        boardId:boardId,
        board:{
          orgId
        }
      },
      data: {
        title,
      },
    });
  } catch (error) {
    console.log(error)
    return {
      error: "Failed to update",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    success: true,
    data:list,  // Assuming `board` should be part of the return type
  } as ReturnType;

};
export const updataList = createSafeAction(UpdateList , handler);
