"use client"
import {CardModal} from "@/components/models/card-modal"
import { useEffect, useState } from "react"
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
        </>
    )
}