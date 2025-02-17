"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder} from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { items,boardId } = data;
  let lists
  try {
    const transation=items.map((list)=>
      db.list.update({
        where:{
          id:list.id,
          board:{
            orgId,
          }
        },
        data:{
          order:list.order
        }
      })
    )
    lists=await db.$transaction(transation)
  } catch (error) {
    console.log(error)
    return {
      error: "Failed to re-order",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    success: true,
    data:lists,  
  } as ReturnType;

};
export const updateListOrder= createSafeAction(UpdateListOrder, handler);
