//use-card- model.ts
import {create} from "zustand"

interface ProModelStore{

    isOpen:boolean,
    onOpen:()=>void;
    onClose:()=>void;
}

export const useProModel=create<ProModelStore>((set)=>({

    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))