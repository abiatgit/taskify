"use client";

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextArea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UseAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { RefObject, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardWithList;
}
export const Description = ({ data }: DescriptionProps) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const enabeleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const onkeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disabledEditing();
    }}

    useEventListener("keydown", onkeyDown);

    useOnClickOutside(formRef as RefObject<HTMLElement>, disabledEditing);

    const { execute, fieldErrors } = UseAction(updateCard, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["card", data.id] });
        toast.success(`Card ${data.title} Updated`);
        disabledEditing()
        
      },
      onError: (err) => {
        toast.error(err);
      },
    });

    const onSubmit = (formData: FormData) => {
      const description = formData.get("description") as string;
      const boardId = params.boardId as string;
      execute({ description, boardId, id: data.id });
    };

    return (
      <div className="flex items-start gap-x-3 w-full">
        <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700" />
        <div className="w-full">
          <p className="font-bold text-neutral-700 mb-2">Description</p>

          {isEditing ? (
            <form action={onSubmit} ref={formRef} className="space-y-2">
              <FormTextArea
                id="description"
                className="w-full mt-2"
                placeholder="Add more detailed description"
                defaultValue={data.description || undefined}
                error={fieldErrors}
                ref={textAreaRef}
              />
              <div className="flex items-center gap-x-2">
                <FormSubmit>Save</FormSubmit>
                <Button
                  type="button"
                  onClick={disabledEditing}
                  className="sm"
                  variant={"ghost"}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div
              onClick={enabeleEditing}
              role="button"
              className="min-h-[78px] bg-neutral-100 text-sm font-medium py-3 px-3.5 rounded-md"
            >
              {data.description || "add more detailed description.."}
            </div>
          )}
        </div>
      </div>
    );
  };


Description.Skeliton = function skeliton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-4 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[78px]  bg-neutral-200" />
      </div>
    </div>
  );
};
