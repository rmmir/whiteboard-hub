import { NextRequest, NextResponse } from 'next/server';

import { createWhiteboardHandler, getWhiteboardsHandler } from '@/use-cases/whiteboards';
import { catchErrorHandler } from '@/utils/errorHandler';

export async function GET(request: NextRequest) {
    const whiteboards = await getWhiteboardsHandler(request);

    return NextResponse.json(whiteboards);
}

export async function POST(request: NextRequest) {
    try {
        const response = await createWhiteboardHandler(request);
        if (response instanceof NextResponse) {
            return response;
        }

        return NextResponse.json({ message: 'Whiteboard created successfully' });
    } catch (error) {
        return catchErrorHandler(error);
    }
}
