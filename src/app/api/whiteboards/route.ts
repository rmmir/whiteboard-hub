import { NextRequest, NextResponse } from 'next/server';

import { getAllWhiteboards } from '@/data-access/whiteboards';
import { createWhiteboardHandler } from '@/use-cases/whiteboards';

export async function GET() {
    const whiteboards = await getAllWhiteboards();

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
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}