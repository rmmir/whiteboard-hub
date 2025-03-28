import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './app/lib/session';

async function validateSession(req: NextRequest) {
    const cookie = req.cookies.get('session')?.value;
    return cookie ? await decrypt(cookie) : null;
}

export default async function middleware(req: NextRequest) {
    const session = await validateSession(req);
    const path = req.nextUrl.pathname;

    if (path.startsWith('/hub') && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    if ((path === '/login' || path === '/register') && session?.userId) {
        return NextResponse.redirect(new URL('/hub', req.nextUrl));
    }

    return NextResponse.next();
}

// Define route matchers for middleware to be applied
export const config = {
    matcher: ['/hub/:path*', '/login', '/register'],
};