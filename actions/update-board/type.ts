
import{ z} from "zod"
import { Board } from "@prisma/client"
import { ActionState } from "@/lib/create-safe-action"
import { UpdataBoard } from "./schema"

export type InputType=z.infer<typeof UpdataBoard>
export type ReturnType= ActionState<InputType,Board>