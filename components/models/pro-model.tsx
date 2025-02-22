"use client";
import { useProModel } from "@/hooks/use-pro-model ";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

import hero from "@/public/17d9fe516c658a77922213fd2feaab85.jpg";
import { Button } from "../ui/button";
import { UseAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export const ProModel = () => {
  const proModel = useProModel();
  const {execute,isLoading}=UseAction(stripeRedirect,{
    onSuccess:(data)=>{
      window.location.href=data
    },
    onError:(error)=>{
      toast.error(error)
    }
  })
const onClick=()=>{
  execute({})
}
  return (
    <Dialog open={proModel.isOpen} onOpenChange={proModel.onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-md p-0  mt-10 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image src={hero} alt="Hero" className="object-cover" fill />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6 ">
          <h2 className="font-semibold text-xl">
            Upgrade to Taskify Pro Today!
          </h2>
          <p className="text-sm font-semibold text-neutral-600">
            Explore the greatness of Taskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>Advance checklist</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button disabled={isLoading} onClick={onClick} className="w-full" variant={"primary"}>Upgrade</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
