"use client"

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { UseAction } from "@/hooks/use-action";
import { useProModel } from "@/hooks/use-pro-model ";
import { toast } from "sonner";

interface subscriptionbuttonProp{
    isPro:boolean
}
export const SubscriptionButton=({isPro}:subscriptionbuttonProp)=>{
    const proModel=useProModel()

    const {execute,isLoading}=UseAction(stripeRedirect,{
        onSuccess:(data)=>{
            window.location.href=data
        },
        onError:(error)=>{
            toast.error(error)
        }
    })
    const onClick=()=>{
        if(isPro){
            execute({})
        }else{
            proModel.onOpen()
        }
    }
    
    return (
        <div>
           <Button onClick={onClick} disabled={isLoading}variant={"primary"}>{isPro?"Manage subscription":"Update to pro"}</Button>
        </div>
    )
};

