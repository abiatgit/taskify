"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { UseAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board/index";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { execute, isLoading } = UseAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDelete = () => {
    execute({ id });
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="h-auto w-auto p-2 " variant="transparent">
            <MoreHorizontal className="h-4 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
          <div className="tex-sm font-medium text-center text-neutral-600 pb-4">
            Board action
          </div>
          <PopoverClose asChild>
            <Button
              className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 "
              variant={"ghost"}
            >
              <X className="w-4 h-4" />
            </Button>
          </PopoverClose>
          <Button
            variant={"ghost"}
            onClick={onDelete}
            disabled ={isLoading}
           
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this board
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default BoardOptions;
