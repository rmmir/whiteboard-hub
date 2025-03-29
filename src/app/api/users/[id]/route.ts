import { NextResponse, NextRequest } from 'next/server';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { validate } from 'uuid';

import { usersTable } from '@db/schema';

const db = drizzle(process.env.DATABASE_URL!);

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const updateData: Partial<typeof usersTable.$inferInsert> = await req.json();
    const validationError = await validateProvidedId(params.id);
    if (validationError) {
        return NextResponse.json(
            { message: validationError.message },
            { status: validationError.status },
        );
    }

    await db.update(usersTable).set(updateData).where(eq(usersTable.id, params.id));

    return NextResponse.json({ message: `User with id ${params.id} updated successfully!` });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const validationError = await validateProvidedId(params.id);
    if (validationError) {
        return NextResponse.json(
            { message: validationError.message },
            { status: validationError.status },
        );
    }

    await db.delete(usersTable).where(eq(usersTable.id, params.id));

    return NextResponse.json({ message: `User with id ${params.id} deleted successfully!` });
}

const validateProvidedId = async (
    id: string,
): Promise<{ message: string; status: number } | null> => {
    if (!id) {
        return { message: 'User ID is required', status: 400 };
    }

    if (!validate(id)) {
        return { message: 'Invalid User ID format, please provide a proper UUID', status: 400 };
    }

    const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
    if (!user) {
        return { message: `User with id ${id} not found`, status: 404 };
    }

    return null;
};
