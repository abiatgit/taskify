import React from "react";
import { Info } from "../_componets/info";
import { checkSubscription } from "@/lib/subscription";
import { Separator } from "@/components/ui/separator";
import { SubscriptionButton } from "./_components/subscriptionbutton";

const BillingPage = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-2"></Separator>
      <SubscriptionButton isPro={isPro}/>
    </div>
  );
};

export default BillingPage;
