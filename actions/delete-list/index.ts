"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const {  id,boardId } = data;
  let list
  try {

    list = await db.list.delete({
      where: {
        id,
  boardId,
  board:{
   orgId
  }
      },
  
    });
    console.log("Deleted Board",list)
  } catch (error) {
    console.log(error)
    return {
      error: "Failed to Delete",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {data:list}

};
export const deleteList = createSafeAction(DeleteList, handler);
