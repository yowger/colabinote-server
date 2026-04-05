import {
    Server,
    onLoadDocumentPayload,
    onStoreDocumentPayload,
} from "@hocuspocus/server"

import {
    getDocumentByName,
    saveDocument,
} from "./modules/documents/document.service"
import { applyState, encodeState } from "./yjs/yjs.service"

import {
    type onConnectPayload,
    type onDestroyPayload,
    type onChangePayload,
} from "@hocuspocus/server"

const server = new Server({
    port: 1234,

    async onConnect(data: onConnectPayload) {
        console.log("socket Connected: ")
    },

    async onDisconnect(data: onDestroyPayload) {
        console.log("socket Disconnected: ")
    },

    async onLoadDocument({ documentName, document }: onLoadDocumentPayload) {
        // const data = await getDocumentByName({ documentName })

        // if (data) {
        //     applyState(document, data)
        // }
    },

    async afterLoadDocument() {
        console.log("document loaded")
    },

    async onChange(data: onChangePayload) {},

    async onAwarenessUpdate(data) {},

    async onStoreDocument({ documentName, document }: onStoreDocumentPayload) {
        // const update = Buffer.from(encodeState(document))

        // await saveDocument({
        //     documentName,
        //     data: update,
        // })
    },
})

server.listen()

process.on("SIGINT", async () => {
    await server.destroy()
    process.exit()
})
