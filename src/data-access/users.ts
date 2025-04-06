import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';

import { usersTable } from '@/db/schema';
import { UserRegisterData } from '@/models/user';

const db = drizzle(process.env.DATABASE_URL!);

export async function getAllUsers() {
    return await db.select().from(usersTable);
}

export async function getUserById(id: string) {
    return await db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function getUserByEmail(email: string) {
    return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function createUser(user: UserRegisterData, hashedPassword: string) {
    await db.insert(usersTable).values({ ...user, password: hashedPassword });
}

export async function updateUserById(
    id: string,
    updateData: Partial<typeof usersTable.$inferInsert>,
) {
    await db.update(usersTable).set(updateData).where(eq(usersTable.id, id));
}

export async function deleteUserById(id: string) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
}
