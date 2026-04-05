import {
    pgTable,
    text,
    timestamp,
    customType,
    index,
    uuid,
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

export const boards = pgTable(
    "boards",
    {
        id: uuid("id").primaryKey().defaultRandom(),

        title: text("title").notNull().default("Untitled Board"),

        createdAt: timestamp("created_at").defaultNow().notNull(),

        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => ({
        createdAtIdx: index("boards_created_at_idx").on(table.createdAt),
    }),
)
