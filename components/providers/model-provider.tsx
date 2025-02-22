//model-provider.tsx
"use client"
import {CardModal} from "@/components/models/card-modal"
import { useEffect, useState } from "react"
import { ProModel } from "../models/pro-model"
export const ModelProvider=()=>{
 const [isMounted,setIsMounted]=useState(false)
 useEffect(()=>{
    setIsMounted(true)
 },[])
 if(!isMounted){
    return null
 }
    return(
        <>
        <CardModal></CardModal>
        <ProModel></ProModel>
        </>
    )
}