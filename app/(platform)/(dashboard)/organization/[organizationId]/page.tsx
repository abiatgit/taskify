
import { db } from "@/lib/db";
import Board from "./board";
import { Form } from "./form";

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany();

  return (
    <div className=" flex flex-col space-y-4 ">
      <Form></Form>
      <div className="space-y-2 ">
        {boards.map((item) => (
          <Board key={item.id} id={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
};
export default OrganizationIdPage;
