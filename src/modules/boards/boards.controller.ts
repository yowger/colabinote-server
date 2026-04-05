import { Request, Response } from "express"

import * as boardsService from "./boards.service"

export const getBoards = async (_: Request, res: Response) => {
    const boards = await boardsService.getBoards()
    res.json(boards)
}

export const createBoard = async (_: Request, res: Response) => {
    const board = await boardsService.createBoard()
    res.json(board)
}

export const updateBoardTitle = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const { id } = req.params

    const { title } = req.body
    const board = await boardsService.updateBoardTitle(id, title)

    res.json(board)
}

export const deleteBoard = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const { id } = req.params

    await boardsService.deleteBoard(id)

    res.json({ success: true })
}
