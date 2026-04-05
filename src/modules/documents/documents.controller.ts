import { Request, Response } from "express"
import * as documentsService from "./documents.service"

export const getDocument = async (
    req: Request<{ name: string }>,
    res: Response,
) => {
    try {
        const { name } = req.params

        const data = await documentsService.getDocumentByName(name)

        res.json({
            name,
            data,
        })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}

export const saveDocument = async (
    req: Request<{ name: string }>,
    res: Response,
) => {
    try {
        const { name } = req.params
        const { data } = req.body

        await documentsService.saveDocument(name, data)

        res.json({ success: true })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}
