import { NextRequest, NextResponse } from 'next/server';
import { hash } from '@node-rs/bcrypt';

import { regiserSchema } from '@/schemas/authSchema';
import { UserRegisterData } from '@/models/user';
import { createUser, getUserByEmail } from '@/data-access/users';

export async function register(req: NextRequest) {
    const parsedResult = regiserSchema.safeParse(await req.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const user: UserRegisterData = parsedResult.data;
    const existingUser = await getUserByEmail(user.email);
    console.log('existingUser', existingUser);
    if (existingUser) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await hash(user.password, 10);

    await createUser(user, hashedPassword);
}
