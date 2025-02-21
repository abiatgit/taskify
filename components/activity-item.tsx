import { AuditLog } from "@prisma/client";
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";

interface ActiveItemProps {
  data: AuditLog;
}

export const ActivityItem = ({ data }: ActiveItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} className="rounded-full"></AvatarImage>
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span>
          {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground ">
          {format(new Date(data.createdAt), "MMM d, yyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
