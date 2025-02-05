import { DeleteBoard } from "@/actions/delete-board";
import { FormDeleteButton } from "./form-delete";

interface BoardProps {
  title: string;
  id: string;
}

const Board = ({ title, id }: BoardProps) => {
    const deleteBoardWithId=DeleteBoard.bind(null,id)
  return (
    <form key={id} action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>Board Title:{title}</p>
  <FormDeleteButton/>
    </form>
  );
};

export default Board;
