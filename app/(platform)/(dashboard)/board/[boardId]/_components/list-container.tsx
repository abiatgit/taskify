"use client";
import { useState, useEffect } from "react";
import { UseAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order ";
import { ListItem } from "./list-item";
import { ListWtihCard } from "@/types";
import ListForm from "./list-form";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order ";

interface ListContainerProp {
  data: ListWtihCard[];
  boardId: string;
}
function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
export const ListContainer = ({ data, boardId }: ListContainerProp) => {
  console.log(boardId);
  const [orderedData, setOrderdData] = useState(data);

  const { execute: executeUpdateOrder } = UseAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = UseAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });



  useEffect(() => {
    setOrderdData(data);
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }
    //if Droped in the same positon
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //User moves a list

    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      executeUpdateOrder({ items, boardId });

    }
    //user moves a card
    if (type === "card") {
      const newOrderedData = [...orderedData];

      //Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );

      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return orderedData;
      // Check if cards exists on the sourcelist
      if (!sourceList.cards) sourceList.cards = [];

      // Check if cards exists on the destList
      if (!destList.cards) destList.cards = [];

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards= reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reorderedCards.forEach((card, idx) => (card.order = idx));
        sourceList.cards=reorderedCards;
        setOrderdData(newOrderedData)
        executeUpdateCardOrder({boardId:boardId,items:reorderedCards})
       
        //User moves the card to another list
      } else {
        //Rmove Card form the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        //Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;
        //Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });
        //Update the order for each card in teh destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderdData(newOrderedData);
        executeUpdateCardOrder({
          boardId:boardId,
          items:destList.cards
        })
      }
    }
  };
  {
    console.log(
      "ordeerddata",
      orderedData.map((item) => item.id)
    );
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return (
                <ListItem key={list.id} index={index} data={list}></ListItem>
              );
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
