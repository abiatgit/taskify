import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import {startCase,} from "lodash"

export async function generateMetadata({params}:{ params: { boardId: string }}) {
     const {orgId}= await auth()
     const {boardId}=params

    if(!orgId){
        return {title:"Board"}
    }
    const board = await db.board.findUnique({
        where: {
          id: boardId,
          orgId,
        },})
    return{
      title:startCase(board?.title || "organization")
    }
    
  }

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = await auth();
  const { boardId } = params;
  if (!orgId) {
    redirect("/select-org");
  }
  const board = await db.board.findUnique({
    where: {
      id: boardId,
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
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};
export default BoardIdLayout;
