import { NextRequest, NextResponse } from "next/server";
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import { usersTable } from '@/db/schema';
import { regiserSchema } from '@/use-cases/auth';

type UserRegisterData = Pick<typeof usersTable.$inferInsert, 'name' | 'email' | 'password'>;

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
    try {
        const parsedResult = regiserSchema.safeParse(await req.json());
        if (!parsedResult.success) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const user: UserRegisterData = parsedResult.data;
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
        if (existingUser.length > 0) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }
    
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const { insertedId } = (
            await db.insert(usersTable).values({
                ...user,
                password: hashedPassword,
            }).returning({ insertedId: usersTable.id })
        )[0];
    
        return NextResponse.json({ message: `User with id ${insertedId} created successfully!` });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}