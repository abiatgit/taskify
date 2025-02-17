"use client"

import { Card } from "@prisma/client"
import { Draggable } from "@hello-pangea/dnd"

interface CardItemProps{
    data:Card
    key?:number,
    index:number
}
export const CardItem=({data,index}:CardItemProps)=>{
    
    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided)=>
        <div 
        {...provided.dragHandleProps}
        {...provided.draggableProps}
        ref={provided.innerRef}

        role="button"
        className="truncate border-2 border-transparent hover:border-black py-2 my-0.5 px-3 text-sm bg-white rounded-md shadow-sm">
        {data.title}
        </div>
        }
        </Draggable>
    )
}