import { NextRequest, NextResponse } from 'next/server';

import { getWhiteboardByIdHandler, updateWhiteboardDetailsHandler } from '@/use-cases/whiteboards';
import { catchErrorHandler } from '@/utils/errorHandler';
import { Params } from '@/models/utils';

export async function GET(request: NextRequest, context: Params) {
    try {
        const { id } = await context.params;
        const whiteboards = await getWhiteboardByIdHandler(request, id);

        return NextResponse.json(whiteboards);
    } catch (error) {
        return catchErrorHandler(error);
    }
}

export async function PATCH(request: NextRequest, context: Params) {
    try {
        const { id } = await context.params;
        const response = await updateWhiteboardDetailsHandler(request, id);
        if (response instanceof NextResponse) {
            return response;
        }

        return NextResponse.json({ message: 'Whiteboard details updated successfully' });
    } catch (error) {
        return catchErrorHandler(error);
    }
}
