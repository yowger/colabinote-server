import {
    Server,
    onLoadDocumentPayload,
    onStoreDocumentPayload,
} from "@hocuspocus/server"
import { applyUpdate, encodeStateAsUpdate } from "yjs"

import {
    getDocumentByName,
    saveDocument,
} from "../modules/documents/documents.service"
import { env } from "../config/env"

import {
    type onConnectPayload,
    type onDestroyPayload,
    type onChangePayload,
} from "@hocuspocus/server"

export const hocusServer = new Server({
    port: env.HOCUSFOCUS_PORT,

    async onConnect(data: onConnectPayload) {
        console.log("socket Connected: ")
    },

    async onDisconnect(data: onDestroyPayload) {
        console.log("socket Disconnected: ")
    },

    async onLoadDocument({ documentName, document }: onLoadDocumentPayload) {
        const data = await getDocumentByName(documentName)
        if (data) {
            applyUpdate(document, data)
            console.log("document hydrated from DB")
        } else {
            console.log("new empty document")
        }
    },

    async afterLoadDocument() {
        console.log("document loaded")
    },

    async onChange(data: onChangePayload) {},

    async onAwarenessUpdate(data) {},

    async onStoreDocument({ documentName, document }: onStoreDocumentPayload) {
        const update = Buffer.from(encodeStateAsUpdate(document))
        await saveDocument(documentName, update)
    },
})
