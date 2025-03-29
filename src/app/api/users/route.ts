import { NextResponse, NextRequest } from 'next/server';
import { drizzle } from 'drizzle-orm/libsql';

import { usersTable } from '@/db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET() {
    const users = await db.select().from(usersTable);

    return NextResponse.json({ users });
}
