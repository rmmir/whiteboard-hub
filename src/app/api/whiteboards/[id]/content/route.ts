import { NextRequest, NextResponse } from 'next/server';

import { updateWhiteboardContentHandler } from '@/use-cases/whiteboards';
import { catchErrorHandler } from '@/lib/errorHandler';
import { Params } from '@/models/utils';

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const response = await updateWhiteboardContentHandler(request, params);
        if (response instanceof NextResponse) {
            return response;
        }

        return NextResponse.json({ message: 'Whiteboard elements updated successfully' });
    } catch (error) {
        return catchErrorHandler(error);
    }
}
