//use-card- model.ts
import {create} from "zustand"

interface CardModalStore{
    id?:string 
    isOpen:boolean,
    onOpen:(id:string)=>void;
    onClose:()=>void;
}

export const useCardModal=create<CardModalStore>((set)=>({
    id:undefined,
    isOpen:false,
    onOpen:(id:string)=>set({isOpen:true,id}),
    onClose:()=>set({isOpen:false})
}))