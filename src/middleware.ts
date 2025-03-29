import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './app/lib/session';

async function validateSession(req: NextRequest) {
    const cookie = req.cookies.get('session')?.value;
    return cookie ? await decrypt(cookie) : null;
}

export default async function middleware(req: NextRequest) {
    const session = await validateSession(req);
    const path = req.nextUrl.pathname;

    if (!session?.userId) {
        if (path.startsWith('/login') || path.startsWith('/register')) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if ((path.startsWith('/login') || path.startsWith('/register')) && session?.userId) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

// Define route matchers for middleware to be applied
export const config = {
    matcher: ['/', '/login', '/register'],
};