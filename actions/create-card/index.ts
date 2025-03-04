"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";


const handler = async (data: InputType): Promise<ReturnType> => {
 
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title,boardId,listId } = data;
  let card
  try {
    console.log("hello abi you are a software engineer")
    const list=db.list.findUnique(
      {where:{
      id:listId,
      board:{
        orgId
      }    }})
      if(! list){
        return{
          error:"List not found"
        }
      }
      const lastCard=await db.card.findFirst({
        where:{listId},
        orderBy:{order:"desc"},
        select:{order:true}
      })
      const newOrder=lastCard? lastCard.order+1:1
      card=await db.card.create({
        data:{
          title,
          listId,
          order:newOrder
        }
      })


      await createAuditLog({
        entityTitle: card.title,
        entityId: card.id,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.CREATE,
      });
  } catch (error) {
    console.log(error)
    return {
      error: "Failed to create",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return {
    success: true,
    data:card,  
  } as ReturnType;

};
export const createList= createSafeAction(CreateCard, handler);
