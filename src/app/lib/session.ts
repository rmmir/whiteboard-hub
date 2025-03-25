import "server-only";
import { SignJWT, jwtVerify } from "jose";

type SessionPayload = {
    userId: string;
    expiresAt: Date;
}

const secretKey = process.env.SESSION_SECRET!;
const encodedKey = new TextEncoder().encode(secretKey);
const tokenDuration = 60 * 60 * 24 * 7; // 7 days

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, { algorithms: ["HS256"] });
        return payload as SessionPayload;
    } catch (error) {
        return null;
    }
}