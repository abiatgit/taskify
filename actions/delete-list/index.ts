"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE,ACTION } from "@prisma/client";

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
    await createAuditLog({
      entityId:list.id,
      entityTitle:list.title,
      entityType:ENTITY_TYPE.LIST,
      action:ACTION.DELETE
    })

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
