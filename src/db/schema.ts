import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';

export const usersTable = sqliteTable('user', {
    id: text('id').primaryKey().default(uuid()),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: text('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const whiteboardTable = sqliteTable('whiteboard', {
    id: text('id').primaryKey().default(uuid()),
    name: text('name').notNull(),
    description: text('description').notNull(),
    elements: text('elements', { mode: 'json' }).notNull(),
    createdAt: text('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    userId: text('user_id')
        .notNull()
        .references(() => usersTable.id),
});
