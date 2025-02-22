"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";

import { UseAction } from "@/hooks/use-action";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { CreateBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import {  useRef } from "react";
import { useRouter } from "next/navigation";
import { useProModel } from "@/hooks/use-pro-model ";


interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align: "start" | "center" | "end";
  sideOffset?: number;
}
export const FormPopoverProps = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const proModel=useProModel()
  const router=useRouter()
  const closeRef = useRef<HTMLButtonElement>(null);


  const { execute, fieldErrors } = UseAction(CreateBoard, {
    onSuccess: (result) => {
      toast.success("Board Created now");
      closeRef.current?.click()
      router.push(`/board/${result.id}`)
    },
    onError: (error) => {
      console.log("hello abi sukhano?")
      toast.error(error);
      proModel.onOpen()
    },
  });

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    await execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4"></X>
          </Button>
        </PopoverClose>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors}></FormPicker>
            <FormInput
              id="title"
              label="Board title"
              type="text"
              error={fieldErrors}
            ></FormInput>
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
