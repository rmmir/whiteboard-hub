import { NextRequest, NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ message: 'Logout successful' });
    response.headers.set(
        'Set-Cookie',
        'session=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    );

    return response;
}