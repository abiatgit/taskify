"use client"
import ListForm from "./list-form"
import { ListWtihCard } from "@/types";
interface ListContainerProp{
  data:ListWtihCard[]
  boardId:string;
}
export const ListContainer=({data,boardId}:ListContainerProp)=>{
    console.log(data,boardId)
   return(
<ol>
    <ListForm/>
    <div className="flex-shrink-0 w-1"/>
</ol>
   )
}