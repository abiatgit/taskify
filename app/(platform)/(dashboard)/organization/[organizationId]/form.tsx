"use client";
import { createBoard } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

export const Form = () => {
  const initialState = { message: "", error: {} };
  const [state, dispatch] = useFormState(createBoard, initialState);
  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border border-black p-1 "
        />
        {state?.error?.title ? (
            <div>
                {state.error.title.map((error:string)=>(
                    <p key={error}className="text-rose-500">
                        {error}
                    </p>
                ))}
            </div>
        ):null}
      </div>
      <Button type="submit" variant={"primary"} className="mx-4">
        Submit
      </Button>
    </form>
  );
};
