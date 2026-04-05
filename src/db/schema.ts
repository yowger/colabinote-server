import {
    pgTable,
    text,
    timestamp,
    customType,
    index,
} from "drizzle-orm/pg-core"

const bytea = customType<{ data: Buffer }>({
    dataType() {
        return "bytea"
    },
})

export const documents = pgTable(
    "documents",
    {
        name: text("name").primaryKey(),
        data: bytea("data"),
        updatedAt: timestamp("updated_at").defaultNow(),
    },
    (table) => ({
        updatedAtIdx: index("documents_updated_at_idx").on(table.updatedAt),
    }),
)
