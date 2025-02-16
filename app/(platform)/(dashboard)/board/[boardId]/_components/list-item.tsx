"use client"
import ListHeader from "./list-header";
import { ListWtihCard } from "@/types"
import { useRef ,ComponentRef,useState} from "react";
import CardForm from "./CardForm";

interface ListItemProps{
    data:ListWtihCard;
    index:number
}

export const ListItem=({data}:ListItemProps)=>{
    const textareaRef= useRef<ComponentRef<'textarea'>>(null);
    const [isEditing,setIsEditing]=useState(false)
    const disableEditing=()=>{
        setIsEditing(false)
    }
    const enableEditing=()=>{
            setIsEditing(true)
            setTimeout(()=>{
              textareaRef.current?.focus()
            })
    }
    return(
     <li className="shrink-0 h-full w-[272px] select-none" >
        <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader onAddCard={enableEditing  } data={data}/>
        <div>
            <CardForm listId={data.id} ref={textareaRef} isEditing={isEditing} enableEditing={enableEditing} disabledEditing={disableEditing}/>
        </div>
        </div>

     </li>
    )
}
