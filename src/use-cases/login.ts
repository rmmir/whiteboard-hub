import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { loginSchema } from '@/lib/authSchema';
import { createSession } from '@/lib/session';
import { getUserByEmail } from '@/data-access/users';
import { UserLoginData } from '@/models/user';

export async function login(req: NextRequest) {
    const parsedResult = loginSchema.safeParse(await req.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }
    const user: UserLoginData = parsedResult.data;
    const existingUser = await getUserByEmail(user.email);
    const isPasswordMatch =
        existingUser.length > 0 && (await bcrypt.compare(user.password, existingUser[0].password));
    if (existingUser.length === 0 || !isPasswordMatch) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const sessionCookie = await createSession(existingUser[0].id);
    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.set('Set-Cookie', sessionCookie.toString());
    return response;
}
