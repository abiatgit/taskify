import {z} from "zod"

export const UpdateList=z.object({
    title:z.string({
        required_error:"Title data is required",
        invalid_type_error:" is required"
    }).min(3,{message:"Title is too short"}),
    id: z.string(),
    boardId:z.string()
})