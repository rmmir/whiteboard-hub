import { NextResponse, NextRequest } from 'next/server';

import { deleteUserByIdHandler, updateUserByIdHandler } from '@/use-cases/users';
import { Params } from '@/models/utils';

export async function PATCH(req: NextRequest, { params }: Params) {
    const response = await updateUserByIdHandler(req, params);
    if (response instanceof NextResponse) {
        return response;
    }

    return NextResponse.json({ message: `User with id ${params.id} updated successfully!` });
}

export async function DELETE(_: NextRequest, { params }: Params) {
    const response = await deleteUserByIdHandler(params);
    if (response instanceof NextResponse) {
        return response;
    }

    return NextResponse.json({ message: `User with id ${params.id} deleted successfully!` });
}
