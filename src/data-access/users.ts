import { eq } from 'drizzle-orm';

import { db } from '@db/index';
import { usersTable } from '@/db/schema';
import { User, UserRegisterData } from '@/models/user';

export async function getAllUsers() {
    return await db.select().from(usersTable);
}

export async function getUserById(id: string) {
    return await db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

    if (user.length === 0) {
        return null;
    }

    return user[0] as User;
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
