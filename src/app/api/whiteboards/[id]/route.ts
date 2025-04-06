import { NextRequest, NextResponse } from 'next/server';

import { getWhiteboardById } from '@/data-access/whiteboards';
import { updateWhiteboardDetailsHandler } from '@/use-cases/whiteboards';
import { catchErrorHandler } from '@/lib/errorHandler';
import { Params } from '@/models/utils';

export async function GET(_: NextRequest, { params }: Params) {
    try {
        const whiteboards = await getWhiteboardById(params.id);
    
        return NextResponse.json(whiteboards);
    } catch (error) {
        return catchErrorHandler(error);
    }
}

export async function PATCH(request: NextRequest, { params }: Params) {
    try {
        const response = await updateWhiteboardDetailsHandler(request, params);
        if (response instanceof NextResponse) {
            return response;
        }
    
        return NextResponse.json({ message: 'Whiteboard details updated successfully' });
    } catch (error) {
        return catchErrorHandler(error);
    }
}