import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { v4 as uuid } from 'uuid';

export const usersTable = sqliteTable('user', {
    id: text().primaryKey().default(uuid()),
    name: text().notNull(),
    email: text().notNull().unique(),
});
