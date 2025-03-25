import { NextResponse, NextRequest } from 'next/server';
import { drizzle } from 'drizzle-orm/libsql';

import { usersTable } from '@db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function GET() {
    const users = await db.select().from(usersTable);

    return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
    const user: typeof usersTable.$inferInsert = await req.json();

    const { insertedId } = (
        await db.insert(usersTable).values(user).returning({ insertedId: usersTable.id })
    )[0];

    return NextResponse.json({ message: `User with id ${insertedId} created successfully!` });
}
