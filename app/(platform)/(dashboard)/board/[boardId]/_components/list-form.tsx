"use client";
import { useState, useRef, RefObject } from "react";
import { Plus } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UseAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ListForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();


  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disabledEditing = () => {
    setIsEditing(false);
  };
  const { execute, fieldErrors } = UseAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" Created`);
      disabledEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disabledEditing();
    }
  };
  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef as RefObject<HTMLElement>, disabledEditing);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({ title, boardId });
  };



  if (isEditing) {
    return (
      <ListWrapper>
        <form
          onSubmit={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            error={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title" 
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1 ">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disabledEditing} size="sm" variant={"ghost"}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3  flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a List
      </button>
    </ListWrapper>
  );
};
export default ListForm;
