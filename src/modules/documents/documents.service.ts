import {
    getDocumentByNameQuery,
    saveDocumentQuery,
    deleteDocumentQuery,
} from "./documents.model"

export const getDocumentByName = async (documentName: string) => {
    if (!documentName) {
        throw new Error("Document name is required")
    }

    return await getDocumentByNameQuery(documentName)
}

export const saveDocument = async (documentName: string, data: Uint8Array) => {
    if (!documentName) {
        throw new Error("Document name is required")
    }

    if (!data) {
        throw new Error("Document data is required")
    }

    await saveDocumentQuery(documentName, data)
}

export const deleteDocument = async (documentName: string) => {
    if (!documentName) {
        throw new Error("Document name is required")
    }

    await deleteDocumentQuery(documentName)
}
