import { pgTable, text, json, uuid } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';

export const usersTable = pgTable('user', {
    id: uuid("id").defaultRandom().primaryKey(),
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

export const whiteboardTable = pgTable('whiteboard', {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    elements: json('elements'),
    createdAt: text('created_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    userId: uuid('user_id')
        .notNull()
        .references(() => usersTable.id),
});
