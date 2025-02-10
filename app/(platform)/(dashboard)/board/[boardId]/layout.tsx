import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import BoardNavbar from "./_components/board-nav-bar";
import {startCase} from "lodash"

export async function generateMetadata({ params }: { params: { boardId: string } }) {
  const { orgId } = await auth();
  const { boardId } = await params;
  if (!orgId) {
    return { title: "Board" };
  }

  const board = await db.board.findUnique({
    where: {
      id:boardId,
      orgId,
    },
  });

  return {
    title: startCase(board?.title || "Organization"),
  };
}


const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params:{ boardId: string };
}) => {
  const { orgId } = await auth();
  const { boardId } =await params;
  
  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id:boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }
  return (
    <div
      className="relative h-full bg-no-repeat bg-center bg-cover "
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
        <BoardNavbar data={board}/>
        <div className="absolute inset-0 bg-black/20"/>
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};
export default BoardIdLayout;
