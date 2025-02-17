"use client";
import { useState, useEffect } from "react";
import { ListItem } from "./list-item";
import { ListWtihCard } from "@/types";
import ListForm from "./list-form";
import { DragDropContext, Droppable,DropResult } from "@hello-pangea/dnd";

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

  useEffect(() => {
    setOrderdData(data);
  }, [data]);

  const onDragEnd = (result:DropResult ) => {

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
     setOrderdData((prev) => {
        const items = reorder(prev, source.index, destination.index).map(
          (item, index) => ({ ...item, order: index })
        );
        return items;
      });
      // TODO :Triger Server Action
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

      if (!sourceList || !destList) return orderedData
      // Check if cards exists on the sourcelist
      if (!sourceList.cards) sourceList.cards = [];
      
      // Check if cards exists on the destList
      if (!destList.cards) destList.cards = [];
      
      // Moving the card in the same list
      if (source.droppableId === destination.droppableId ) {
        sourceList.cards = reorder(sourceList.cards, source.index, destination.index);
        sourceList.cards.forEach((card, idx) => (card.order = idx));
        // TODO :Triger Server Action
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
        // TODO :Triger Server Action
      }
    }
  };
  {console.log("ordeerddata",orderedData.map((item) => item.id)); }
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
