import { List } from "@prisma/client";
import React, { useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { deleteList } from "@/actions/delete-list";
import { UseAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { execute: executeDelete } = UseAction(deleteList, {
    onSuccess(data) {
      toast.success(`${data.title} deleted `);
      closeRef.current?.click()
    },
    onError(error) {
      console.error(error);
      toast.error("unable to delete");
    },
  });
  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({ id, boardId });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose ref={closeRef}>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600 "
            variant={"ghost"}
          >
            <X className="h-4 w-4"></X>
          </Button>{" "}
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full p-2 h-auto justify-start font-normal text-sm"
          variant={"ghost"}
        >
          Add Card..
        </Button>
        <form>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full p-2 h-auto justify-start font-normal text-sm"
            variant="ghost"
          >
            Copy list
          </FormSubmit>
        </form>
        <Separator></Separator>
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            className="rounded-none w-full p-2 h-auto justify-start font-normal text-sm"
            variant="ghost"
          >
            Delete
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
