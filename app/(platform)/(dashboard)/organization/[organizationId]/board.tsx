import { Button } from "@/components/ui/button";
import { DeleteBoard } from "@/actions/delete-board";

interface BoardProps {
  title: string;
  id: string;
}

const Board = ({ title, id }: BoardProps) => {
    const deleteBoardWithId=DeleteBoard.bind(null,id)
  return (
    <form key={id} action={deleteBoardWithId} className="flex items-center gap-x-2">
      <p>Board Title:{title}</p>
      <Button type="submit" variant={"destructive"} size={"sm"}>
        Delete
      </Button>
    </form>
  );
};

export default Board;
