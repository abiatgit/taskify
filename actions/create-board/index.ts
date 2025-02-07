"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createBoard } from "./schema";
import { InputType, ReturnType } from "./type";
import { createSafeAction } from "@/lib/create-safe-action";

export const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }
  const { title } = data;
  let board;
  try {
// throw new Error("Stimulating an error")
// Simulating an error
    board = await db.board.create({
      data: {
        title,
      },
    });

  } catch (error) {
    console.error("An error occurred:", error);
    return {
      error: "Failed to create board",
    };
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const CreateBoard = createSafeAction(createBoard, handler);
