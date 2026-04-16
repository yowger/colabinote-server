import { z } from "zod"

export const getDocumentSchema = {
    params: z.object({
        name: z.string(),
    }),
}

export const saveDocumentSchema = {
    params: z.object({
        name: z.string(),
    }),
    body: z.object({
        data: z.array(z.number()).transform((arr) => new Uint8Array(arr)),
    }),
}

export const deleteDocumentSchema = {
    params: z.object({
        name: z.string(),
    }),
}
