import { NextRequest, NextResponse } from 'next/server';

import { updateWhiteboardContentHandler } from '@/use-cases/whiteboards';
import { catchErrorHandler } from '@/utils/errorHandler';
import { Params } from '@/models/utils';

export async function PATCH(request: NextRequest, context: Params) {
    try {
        const { id } = await context.params;
        const response = await updateWhiteboardContentHandler(request, id);
        if (response instanceof NextResponse) {
            return response;
        }

        return NextResponse.json({ message: 'Whiteboard elements updated successfully' });
    } catch (error) {
        return catchErrorHandler(error);
    }
}
