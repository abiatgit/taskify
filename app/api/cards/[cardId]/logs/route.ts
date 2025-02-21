import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ENTITY_TYPE } from "@prisma/client";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const awaitedParams = await params;
    const entityId = awaitedParams.cardId;
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 301 });
    }
    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: entityId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
    return NextResponse.json(auditLogs);
  } catch (error) {
    console.log(error);
    return new NextResponse("internal Error", { status: 500 });
  }
}
