"use client"

import { Card } from "@prisma/client"

interface CardItemProps{
    data:Card
    key?:number,
    index?:number
}
export const CardItem=({data}:CardItemProps)=>{
    return (
        <div 
        role={"button"}
        className="truncate border-2 border-transparent hover:border-black py-2 my-0.5 px-3 text-sm bg-white rounded-md shadow-sm">
        {data.title}
        </div>
    )
}