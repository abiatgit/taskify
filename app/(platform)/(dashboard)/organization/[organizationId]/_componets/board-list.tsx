import { HelpCircle, User2 } from "lucide-react";
import { Hint } from "@/components/hint";
import { FormPopoverProps } from "@/components/form/form-popover";
export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your Board
      </div>
      <div className="grid grid-col-2 sm:grid-cols-3 lg:grid-col-4 gap-4">
         <FormPopoverProps align="center" sideOffset={10} side="right">
        <div
          role="button"
          className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col items-center justify-center hover:opacity-75 transition"
        >
          <p className="text-sm ">Create new board</p>
          <span className="text-xs">5 Remaining</span>
          <Hint
            sideOffset={40}
            description={`Free Workspaces can have up to 5 open board.For unllimited boards upgrade this workspace.`}
          >
            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
          </Hint>
        </div>
        </FormPopoverProps>
      </div>
    </div>
  );
};
