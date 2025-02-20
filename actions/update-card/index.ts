"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id,boardId,...values } = data;
  let card;
  try {

    card = await db.card.update({
      where: {
        id,
       list:{
        board:{
          orgId
        }
       }
      },
      data: {
        ...values
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
 
    data:card,  
  } as ReturnType;

};
export const updateCard = createSafeAction(UpdateCard, handler);// Passing zod validation adn handler funciton 
