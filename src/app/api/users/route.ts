import { NextResponse } from 'next/server';

import { getAllUsers } from '@/data-access/users';

export async function GET() {
    const users = await getAllUsers();

    return NextResponse.json({ users });
}
