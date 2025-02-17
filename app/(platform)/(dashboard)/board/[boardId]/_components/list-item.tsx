"use client";
import ListHeader from "./list-header";
import { ListWtihCard } from "@/types";
import { useRef, ComponentRef, useState } from "react";
import CardForm from "./CardForm";
import { cn } from "@/lib/utils";
import { CardItem } from "./cardItem";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface ListItemProps {
  data: ListWtihCard;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ComponentRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const disableEditing = () => {
    setIsEditing(false);
  };
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div {...provided.dragHandleProps}
           className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
            <ListHeader onAddCard={enableEditing} data={data} />
            <Droppable droppableId={data.id} type="card">
              {(provided)=>(
            <ol
            ref={provided.innerRef}
            {...provided.droppableProps}
              className={cn(
                "mx-1 px-1 py-1 flex flex-col gap-y2 ",
                data.cards.length > 0 ? "mt-2" : "mt-0"
              )}
            >
              {data?.cards?.map((card, index) => (
                <CardItem index={index} key={index} data={card} />
              ))}
              {provided.placeholder}
            </ol>
            )}
            </Droppable>
            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
            <div></div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
