"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { Board } from "@prisma/client";
import { useRef, useState } from "react";
import { updataBoard } from "@/actions/update-board";
import { UseAction } from "@/hooks/use-action";
import { toast } from "sonner";

interface BoardTitleProps {
  data: Board;
}
export const BoardTitleForm = ({ data }: BoardTitleProps) => {
  const { execute } = UseAction(updataBoard, {
      onSuccess: (data) => {
      console.log("onSuccess Triggered with:", data);
      toast.success(`Board "${data.title}" Updated`);
      setTitle(data.title);
      disabledEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(data?.title);

  const [isEditing, setIsEditing] = useState(false);
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

  const onSubmit = async (event:React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const title = formData.get("title") as string;
    setTitle(title);
    try {
      const result = await execute({ title, id: data.id }); // ✅ Await to resolve the promise
      console.log("Execute Resolved Result:", result); // This will log the final result
    } catch (error) {
      console.error("Error executing action:", error);
    }
  };
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };
  if (isEditing) {
    return (
      <form
        onSubmit={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant={"transparent"}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
