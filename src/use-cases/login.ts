import { compare } from '@node-rs/bcrypt';
import { NextRequest, NextResponse } from 'next/server';

import { loginSchema } from '@/schemas/authSchema';
import { createSession } from '@/utils/session';
import { getUserByEmail } from '@/data-access/users';
import { UserLoginData } from '@/models/user';

export async function login(req: NextRequest) {
    const parsedResult = loginSchema.safeParse(await req.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }
    const user: UserLoginData = parsedResult.data;
    const existingUser = await getUserByEmail(user.email);
    if (!existingUser) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }
    const isPasswordMatch = await compare(user.password, existingUser.password);
    if (!isPasswordMatch) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
    }

    const sessionCookie = await createSession(existingUser.id);
    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.set('Set-Cookie', sessionCookie.toString());
    return response;
}
