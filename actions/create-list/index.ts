"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE,ACTION } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title,boardId } = data;
  let list
  try {
    const board=await db.board.findUnique({
      where:{
        id:boardId,
        orgId
      }
    })
    if(!board) {
      return {
        error:"Board not found"
      }
    }

    const lastList=await db.list.findFirst({
      where:{boardId:boardId},
      orderBy:{order:"desc"},
      select:{order:true}
    })
    const newOrder=lastList?lastList.order+1 :1

    list = await db.list.create({
     data: {
   title,boardId,order:newOrder
      },
    });
    await createAuditLog ({
      entityId:list.id,
      entityTitle:list.title,
      entityType:ENTITY_TYPE.LIST,
      action:ACTION.CREATE
    })
  } catch (error) {
    console.log(error)
    return {
      error: "Failed to create",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    success: true,
    data:list,  
  } as ReturnType;

};
export const createList= createSafeAction(CreateList, handler);
