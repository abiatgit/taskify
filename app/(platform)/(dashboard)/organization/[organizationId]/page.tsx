import { Separator } from "@/components/ui/separator";
import { Info } from "./_componets/info";
import { BoardList } from "./_componets/board-list";
const OrganizationIdPage = async () => {
  return (
    <div className=" w-full mb-20 ">
      <Info/>
      <Separator className="my-4"/>
      <div className="px-2 md:px-4">
        <BoardList></BoardList>

      </div>
    </div>
  );
};
export default OrganizationIdPage;
