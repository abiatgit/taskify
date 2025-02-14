import { FormInput } from "@/components/form/form-input";
import { UseAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { useState, useRef } from "react";
import { useEventListener } from "usehooks-ts";
import { updataList } from "@/actions/update-list";
import { toast } from "sonner";
interface ListHeaderProps {
  data: List;
}

const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };
  const disabledEditing = () => {
    setIsEditing(false);
  };
  const { execute } = UseAction(updataList, {
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
      disabledEditing();
    },
    onError: () => toast.error("error"),
  });
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disabledEditing();
    }
    execute({
      title,
      id,
      boardId,
    });
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };
  useEventListener("keydown", onkeydown);
  return (
    <div className="pt-3 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form
          className="flex-1 px-[2px]"
          /// <reference path="" />
          ref={formRef}
          action={handleSubmit}
        >
          <input hidden id="id" name="id" value={data.id}></input>
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
          ></input>
          <FormInput
            onBlur={onBlur}
            className="text-sm px-[7px] h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white "
            ref={inputRef}
            id="title"
            placeholder="Eneter list title"
            defaultValue={title}
          />
          <button type="submit" hidden/>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
    </div>
  );
};

export default ListHeader;
