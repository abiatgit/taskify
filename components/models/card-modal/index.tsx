//use-card-model.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-model";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { Header } from "./header";
import { Description } from "./description";
import { Action } from "./actions";
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
        <DialogTitle>
          {!cardData ? <Header.Skeleton /> : <Header data={cardData}></Header>}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
            <div className="col-span-3">
              <div className="w-full space-y-6">
                {!cardData ? (
                  <Description.Skeliton></Description.Skeliton>
                ) : (
                  <Description data={cardData}></Description>
                )}
              </div>
            </div>
            {!cardData ? <Action.Skeleton/>: <Action data={cardData} />}
          </div>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
