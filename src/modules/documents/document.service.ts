import { pool } from "../../db/db"

export type GetDocumentPayload = {
    documentName: string
}

export const getDocumentByName = async ({
    documentName,
}: GetDocumentPayload) => {
    const result = await pool.query(
        "SELECT data FROM documents WHERE name = $1",
        [documentName],
    )

    return result.rows[0]?.data ?? null
}

export type SaveDocumentPayload = {
    documentName: string
    data: Uint8Array
}

export const saveDocument = async ({
    documentName,
    data,
}: SaveDocumentPayload) => {
    const result = await pool.query(
        `INSERT INTO documents (name, data, updated_at)
            VALUES ($1, $2, NOW())
            ON CONFLICT (name)
            DO UPDATE SET data = $2, updated_at = NOW()`,
        [documentName, data],
    )

    return result
}
