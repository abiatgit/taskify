import { Separator } from "@/components/ui/separator";
import { Info } from "./_componets/info";
import { BoardList } from "./_componets/board-list";
import { Suspense } from "react";
import { checkSubscription } from "@/lib/subscription";
const OrganizationIdPage = async () => {
  const isPro=await checkSubscription()
  return (
    <div className=" w-full mb-20 ">
      <Info isPro={isPro}/>
      <Separator className="my-4"/>
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton/>}>
        <BoardList/>
        </Suspense>

      </div>
    </div>
  );
};
export default OrganizationIdPage;
