import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const documents = sqliteTable('documents', {
    id: text('id').primaryKey().default(crypto.randomUUID()),
    name: text('name').notNull(),
    path: text('path').notNull(),
    created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`)
});

export const knowledgebase = sqliteTable('knowledgebase', {
    id: text('id').primaryKey().default(crypto.randomUUID()),
    name: text('name').notNull(),
    created_at: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    document_ids: text('document_ids').notNull().default(sql`'[]'`)
});