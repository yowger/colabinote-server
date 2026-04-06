import { Request, Response } from "express"

import * as boardsService from "./boards.service"
import { requestValidator } from "../../helpers/requestValidator"
import { deleteBoardSchema, updateBoardSchema } from "./boards.schema"

const updateBoardValidator = requestValidator(updateBoardSchema)
const deleteBoardValidator = requestValidator(deleteBoardSchema)

export const getBoards = async (_: Request, res: Response) => {
    const boards = await boardsService.getBoards()
    res.json(boards)
}

export const createBoard = async (_: Request, res: Response) => {
    const board = await boardsService.createBoard()

    res.status(201).json(board)
}

export const updateBoardTitle = async (req: Request, res: Response) => {
    const { id } = updateBoardValidator.getParams(req)
    const { title } = updateBoardValidator.getBody(req)

    const board = await boardsService.updateBoardTitle(id, title)

    res.status(200).json(board)
}

export const deleteBoard = async (req: Request, res: Response) => {
    const { id } = deleteBoardValidator.getParams(req)

    await boardsService.deleteBoard(id)

    res.status(204).send()
}
