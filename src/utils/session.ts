import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { RequestCookie, ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';
import { getUserById } from '@/data-access/users';
import { HttpError } from './errorHandler';

export type SessionPayload = {
    userId: string;
    expiresAt: Date;
};

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);
const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: string): Promise<ResponseCookies> {
    const expiresAt = new Date(Date.now() + tokenDuration);
    const session = await encrypt({ userId, expiresAt });

    return (await cookies()).set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
}

export async function encrypt(payload: SessionPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(session, encodedKey, { algorithms: ['HS256'] });
        return payload as SessionPayload;
    } catch (error) {
        return null;
    }
}

export async function processAuthGuard(
    session: RequestCookie | undefined,
): Promise<SessionPayload> {
    if (!session) throw new HttpError(401, 'Unauthorized');

    const payload = await decrypt(session.value);
    if (!payload) throw new HttpError(401, 'Unauthorized');

    const user = await getUserById(payload.userId);
    if (user.length === 0) throw new HttpError(400, `Invalid userId: ${payload.userId}`);

    return payload;
}
