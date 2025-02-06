"use client";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "./form-input";
import { FormButton } from "./form-button";
import { UseAction } from "@/hooks/use-action";

export const Form = () => {
  const { execute, fieldErrors } = UseAction(createBoard, {
    onSuccess: (data) => {
      console.log(data, "succeess");
    },
    onError: (err) => {
      console.log(err,"error");
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault(); 
      const formData = new FormData(e.currentTarget);
      onSubmit(formData);
    }}>
      <div className="flex flex-col space-y-2">
        <FormInput errors={fieldErrors} />
      </div>
      <FormButton />
    </form>
  );
};
