
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cardId: string }> }
) {
  const { cardId } = await params;
  console.log("abi-cardid",cardId)
  if (!cardId) {
    return NextResponse.json({ error: "Card ID is required" }, { status: 400 });
  }
  try {
    const { userId, orgId } = await auth();
    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const card = await db.card.findUnique({
      where: {
        id:cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: { title: true },
        },
      },
    });

    if (!card) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error) {
    console.error("Error fetching card:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
