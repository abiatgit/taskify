"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  console.log("copy card abi")
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }
  const { id, boardId } = data;

  let card;
  try {
    const cardTocopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
    if (!cardTocopy) {
      return { error: "card not found" };
    }
    const lastCard = await db.card.findFirst({
      where: { listId: cardTocopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });
    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: `${cardTocopy.title}-Copy`,
        description: cardTocopy.description,
        order: newOrder,
        listId: cardTocopy.listId,
      },
    });
    await createAuditLog({
      entityTitle:card.title,
      entityId:card.id,
      entityType:ENTITY_TYPE.CARD,
      action:ACTION.CREATE
    })
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to copy",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};
export const copyCard = createSafeAction(CopyCard, handler);


