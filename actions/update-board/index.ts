"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ENTITY_TYPE,ACTION } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title, id } = data;
  let board;
  try {

    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
    await createAuditLog ({
      entityId:board.id,
      entityTitle:board.title,
      entityType:ENTITY_TYPE.CARD,
      action:ACTION.UPDATE
    })
  } catch (error) {
    console.log("Abi",error)
    return {
      error: "Failed to update",
    };
  }
  revalidatePath(`/board/${id}`);
  return {
    success: true,
    data:board,  // Assuming `board` should be part of the return type
  } as ReturnType;

};
export const updataBoard = createSafeAction(UpdateBoard, handler);// Passing zod validation adn handler funciton 
