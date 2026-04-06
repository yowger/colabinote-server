import { z } from "zod"

export const updateBoardSchema = {
    params: z.object({
        id: z.string(),
    }),
    body: z.object({
        title: z.string().min(1),
    }),
}

export const deleteBoardSchema = {
    params: z.object({
        id: z.string(),
    }),
}
