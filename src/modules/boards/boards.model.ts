import { pool } from "../../db/db"

export type BoardRow = {
    id: string
    title: string
    created_at: Date
    updated_at: Date
}

export const getBoardsQuery = async (): Promise<BoardRow[]> => {
    const result = await pool.query(
        `SELECT * FROM boards
         ORDER BY updated_at DESC`,
    )

    return result.rows
}

export const createBoardQuery = async (): Promise<BoardRow> => {
    const result = await pool.query(
        `INSERT INTO boards (title, created_at, updated_at)
         VALUES ('Untitled', NOW(), NOW())
         RETURNING *`,
    )

    return result.rows[0]
}

export const updateBoardTitleQuery = async (
    id: string,
    title: string,
): Promise<BoardRow | null> => {
    const result = await pool.query(
        `UPDATE boards
         SET title = $1,
             updated_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [title, id],
    )

    return result.rows[0] ?? null
}

export const deleteBoardQuery = async (id: string): Promise<void> => {
    await pool.query(`DELETE FROM boards WHERE id = $1`, [id])
}
