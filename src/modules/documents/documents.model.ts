import { pool } from "../../db/db"

export type DocumentRow = {
    name: string
    data: Uint8Array | null
    updated_at: Date
}

export const getDocumentByNameQuery = async (
    documentName: string,
): Promise<Uint8Array | null> => {
    const result = await pool.query(
        `SELECT data FROM documents WHERE name = $1`,
        [documentName],
    )

    return result.rows[0]?.data ?? null
}

export const saveDocumentQuery = async (
    documentName: string,
    data: Uint8Array,
): Promise<void> => {
    await pool.query(
        `INSERT INTO documents (name, data, updated_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (name)
         DO UPDATE SET
            data = $2,
            updated_at = NOW()`,
        [documentName, data],
    )
}
