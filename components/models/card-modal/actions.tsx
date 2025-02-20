"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { UseAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card ";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useCardModal } from "@/hooks/use-card-model";

interface ActionProps {
  data: CardWithList;
}

export const Action = ({ data }: ActionProps) => {
  const params = useParams();
  const { title } = data;
  const cardModel = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = UseAction(
    copyCard,
    {
      onSuccess: () => {
        toast.success(`Card ${data.title} Copied`);
        cardModel.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );
  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = UseAction(
    deleteCard,
    {
      onSuccess: () => {
        toast.success(`Card ${data.title} Deleted`);
        cardModel.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;
    executeCopyCard({ id: data.id, boardId });
  };

  const onDelete = () => {
    const boardId = params.boardId as string;
    executeDeleteCard({ id: data.id, boardId });
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions {title}</p>
      <Button
        variant={"gray"}
        size={"inline"}
        className="w-full justify-start"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="h-4 w-4 mr-2 " />
        Copy
      </Button>
      <Button
        variant={"gray"}
        size={"inline"}
        className="w-full justify-start"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        <Trash className="h-4 w-4 mr-2 " />
        Delete
      </Button>
    </div>
  );
};
Action.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
