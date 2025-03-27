import { NextRequest, NextResponse } from "next/server";
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import { usersTable } from '@db/schema';
import { loginSchema } from '@use-cases/auth';
import { createSession } from "@/app/lib/session";

type UserLoginData = Pick<typeof usersTable.$inferInsert, 'email' | 'password'>;

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {
    try {
        const parsedResult = loginSchema.safeParse(await req.json());
        if (!parsedResult.success) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }
        
        const user: UserLoginData = parsedResult.data;
        const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
        const isPasswordMatch = await bcrypt.compare(user.password, existingUser[0].password);
        if (existingUser[0].email !== user.email || !isPasswordMatch) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
        }
    
        const cookie = await createSession(existingUser[0].id);
        const session = await cookie.get("session");
        
        return NextResponse.json({ message: 'Login successful', token: session?.value });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}