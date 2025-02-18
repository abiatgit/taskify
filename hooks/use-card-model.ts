import {create} from "zustand"


interface CardModalStore{
    id?:string | undefined
    isOpen:boolean,
    onOpen:(id:string)=>void;
    onClose:()=>void;
}

export const useCardModal=create<CardModalStore>((set)=>({
    isOpen:false,
    id:undefined,

    onOpen:(id:string)=>set({isOpen:true,id}),
    onClose:()=>set({isOpen:false,id:undefined})
}))