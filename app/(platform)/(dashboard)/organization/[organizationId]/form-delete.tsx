
"use client"
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const FormDeleteButton = () => {
    const {pending}=useFormStatus()
  return (
    <div>
      <Button type="submit"  disabled={pending} variant={"destructive"} size={"sm"}>
        Delete
      </Button>
    </div>
  );
};
