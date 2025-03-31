import { NextResponse, NextRequest } from 'next/server';

import { deleteUserByIdHandler, updateUserByIdHandler } from '@/use-cases/users';

type Params = { params: { id: string } };

export async function PATCH(req: NextRequest, { params }: Params) {
    await updateUserByIdHandler(req, params);

    return NextResponse.json({ message: `User with id ${params.id} updated successfully!` });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    await deleteUserByIdHandler(params);

    return NextResponse.json({ message: `User with id ${params.id} deleted successfully!` });
}
