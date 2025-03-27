import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

type SessionPayload = {
    userId: string;
    expiresAt: Date;
}

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);
const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: string): Promise<ResponseCookies> {
    const expiresAt = new Date(Date.now() + tokenDuration);
    const session = await encrypt({ userId, expiresAt });

    return (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
}

export async function encrypt(payload: SessionPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify(session, encodedKey, { algorithms: ["HS256"] });
        return payload as SessionPayload;
    } catch (error) {
        return null;
    }
}