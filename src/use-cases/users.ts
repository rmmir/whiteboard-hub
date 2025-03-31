import { NextRequest, NextResponse } from "next/server";
import { validate } from 'uuid';

import { usersTable } from '@/db/schema';
import { deleteUserById, getUserById, updateUserById } from '@/data-access/users';

type Params = { id: string };

export async function updateUserByIdHandler(req: NextRequest, params: Params) {
    const updateData: Partial<typeof usersTable.$inferInsert> = await req.json();
    const validationError = await validateProvidedId(params.id);
    if (validationError) {
        return NextResponse.json(
            { message: validationError.message },
            { status: validationError.status },
        );
    }

    await updateUserById(params.id, updateData);
}

export async function deleteUserByIdHandler(params: Params) {
    const validationError = await validateProvidedId(params.id);
    if (validationError) {
        return NextResponse.json(
            { message: validationError.message },
            { status: validationError.status },
        );
    }

    await deleteUserById(params.id);

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

    const user = await getUserById(id);
    if (!user) {
        return { message: `User with id ${id} not found`, status: 404 };
    }

    return null;
};