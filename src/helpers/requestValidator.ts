import { Request } from "express"
import { z, ZodError } from "zod"

import { ValidationException } from "./errorClass"

type ValidationSchema = {
    body?: z.ZodObject
    params?: z.ZodObject
    query?: z.ZodObject
}
type InferSchema<T, K extends keyof T> = T[K] extends z.ZodObject
    ? z.infer<T[K]>
    : unknown

type ValidationHelpers<T extends ValidationSchema> = {
    getBody(req: Request): InferSchema<T, "body">
    getParams(req: Request): InferSchema<T, "params">
    getQuery(req: Request): InferSchema<T, "query">
}

export function requestValidator<T extends ValidationSchema>(
    schemas: T,
): ValidationHelpers<T> {
    function createValidator<K extends keyof ValidationSchema>(key: K) {
        return function (req: Request): InferSchema<T, K> {
            const schema = schemas[key]

            if (!schema) {
                return req[key] as InferSchema<T, K>
            }

            try {
                return schema.parse(req[key]) as InferSchema<T, K>
            } catch (error) {
                if (error instanceof ZodError) {
                    const errorDetails = error.issues.map((err) => ({
                        field: err.path.join("."),
                        error: err.message,
                    }))

                    throw new ValidationException(
                        "Validation Error",
                        errorDetails,
                    )
                }

                throw error
            }
        }
    }

    return {
        getBody: createValidator("body"),
        getParams: createValidator("params"),
        getQuery: createValidator("query"),
    }
}
