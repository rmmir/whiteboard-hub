import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

export const usersTable = sqliteTable('user', {
    id: text().primaryKey().default(uuid()),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    created_at: text().notNull().default(sql`CURRENT_TIMESTAMP`),
    updated_at: text().notNull().default(sql`CURRENT_TIMESTAMP`),
});
