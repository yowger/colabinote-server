import * as Y from "yjs"

export const encodeState = (doc: Y.Doc): Uint8Array => {
    return Y.encodeStateAsUpdate(doc)
}

export const applyState = (doc: Y.Doc, update: Uint8Array) => {
    Y.applyUpdate(doc, update)
}
