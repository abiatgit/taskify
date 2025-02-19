//use-card-model.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-model";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { Header } from "./header";
export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
   
  });
  console.log("CardData", cardData);

  return (
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent aria-describedby="card">
  <DialogTitle >
   {!cardData?<Header.Skeleton/>:<Header data={cardData}></Header>}
   </DialogTitle>
  </DialogContent>
</Dialog>

  );
};
