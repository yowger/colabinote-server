import { Server, onStoreDocumentPayload } from "@hocuspocus/server"

import {
    getDocumentByName,
    saveDocument,
} from "./modules/documents/document.service"
import { encodeState } from "./yjs/yjs.service"

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

    async onLoadDocument({ documentName }) {
        await getDocumentByName({ documentName })
    },

    async afterLoadDocument() {
        console.log("document loaded")
    },

    async onChange(data: onChangePayload) {
        // const yNotes = data.document.getMap("notes")
        // const notes = {}
        // yNotes.forEach((yNote, id) => {
        //     notes[id] = yNote.toJSON()
        // })
        // console.log("📦 notes:", notes)
    },

    async onAwarenessUpdate(data) {
        // console.log("awareness update", data)
    },

    async onStoreDocument({ documentName, document }: onStoreDocumentPayload) {
        const update = Buffer.from(encodeState(document))

        await saveDocument({
            documentName,
            data: update,
        })
    },
})

server.listen()

process.on("SIGINT", async () => {
    await server.destroy()
    process.exit()
})
