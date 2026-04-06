import { Request, Response } from "express"

import * as documentsService from "./documents.service"
import { getDocumentSchema, saveDocumentSchema } from "./documents.schema"
import { requestValidator } from "../../helpers/requestValidator"

const getDocumentValidator = requestValidator(getDocumentSchema)
const saveDocumentValidator = requestValidator(saveDocumentSchema)

export const getDocument = async (req: Request, res: Response) => {
    const { name } = getDocumentValidator.getParams(req)

    const data = await documentsService.getDocumentByName(name)

    res.json({ name, data })
}

export const saveDocument = async (req: Request, res: Response) => {
    const { name } = saveDocumentValidator.getParams(req)
    const { data } = saveDocumentValidator.getBody(req)

    await documentsService.saveDocument(name, data)

    res.json({ success: true })
}
