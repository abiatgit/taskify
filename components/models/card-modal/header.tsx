"use client";

import { CardWithList } from "@/types";
import { Layout } from "lucide-react";
import { useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
// import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { UseAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card/index";
import { toast } from "sonner";

interface HeaderProps {
  data: CardWithList;
}
export const Header = ({ data }: HeaderProps) => {
  const [title, setTitle] = useState(data?.title);
  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const { execute } = UseAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`renamed to ${data.title}`);
      setTitle(data.title);
    },
    onError:(error)=>{
      toast.error(error)
    }
  });

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;
    if (title === data.title) return
      execute({ title, boardId, id: data.id });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="h-5 w-5 text-neutral-700 mt-1" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          In list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};
Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-24 h-4  bg-neutral-200" />
      </div>
    </div>
  );
};
