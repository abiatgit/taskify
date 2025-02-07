import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { createBoard } from "./schema";

export type InputType = z.infer<typeof createBoard>;
export type ReturnType = ActionState<InputType, Board>;
