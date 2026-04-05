import {
    getBoardsQuery,
    createBoardQuery,
    updateBoardTitleQuery,
    deleteBoardQuery,
} from "./boards.model"

export const getBoards = async () => {
    const boards = await getBoardsQuery()

    return boards
}

export const createBoard = async () => {
    const board = await createBoardQuery()

    return board
}

export const updateBoardTitle = async (id: string, title: string) => {
    if (!title || title.trim().length === 0) {
        throw new Error("Title cannot be empty")
    }

    const board = await updateBoardTitleQuery(id, title)

    if (!board) {
        throw new Error("Board not found")
    }

    return board
}

export const deleteBoard = async (id: string) => {
    await deleteBoardQuery(id)
}
