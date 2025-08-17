import { NextRequest, NextResponse } from 'next/server';
import {
    getAllWhiteboards,
    createWhiteboard,
    updateWhiteboardDetailsById,
    updateWhiteboardElementsById,
    getWhiteboardById,
} from '@/data-access/whiteboards';
import { processAuthGuard } from '@/utils/session';
import {
    createWhiteboardSchema,
    updateWhiteboardDetailsSchema,
    updateWhiteboardElementsSchema,
} from '@/schemas/whiteboardSchema';
import {
    CreateWhiteboardData,
    UpdateWhiteboardDetailsData,
    UpdateWhiteboardElementsData,
    WhiteboardDetails,
    WhiteboardElements,
} from '@/models/whiteboard';
import { ParamsId } from '@/models/utils';

export async function createWhiteboardHandler(request: NextRequest) {
    const parsedResult = createWhiteboardSchema.safeParse(await request.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const whiteboard: WhiteboardDetails = parsedResult.data;
    const session = request.cookies.get('session');
    const { userId } = await processAuthGuard(session);

    const newWhiteboard: CreateWhiteboardData = {
        name: whiteboard.name,
        description: whiteboard.description,
        elements: [],
        userId,
    };

    await createWhiteboard(newWhiteboard);
}

export async function updateWhiteboardDetailsHandler(request: NextRequest, id: string) {
    const session = request.cookies.get('session');
    await processAuthGuard(session);

    const parsedResult = updateWhiteboardDetailsSchema.safeParse(await request.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const whiteboard: WhiteboardDetails = parsedResult.data;
    const updatedWhiteboardDetails: UpdateWhiteboardDetailsData = {
        name: whiteboard.name,
        description: whiteboard.description,
    };

    await updateWhiteboardDetailsById(id, updatedWhiteboardDetails);
}

export async function updateWhiteboardContentHandler(request: NextRequest, id: string) {
    const session = request.cookies.get('session');
    await processAuthGuard(session);

    const parsedResult = updateWhiteboardElementsSchema.safeParse(await request.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const whiteboardElements: WhiteboardElements = parsedResult.data;
    const updatedWhiteboardDetails: UpdateWhiteboardElementsData = {
        elements: whiteboardElements.elements,
    };

    await updateWhiteboardElementsById(id, updatedWhiteboardDetails);
}

export async function getWhiteboardsHandler(request: NextRequest) {
    const session = request.cookies.get('session');
    const { userId } = await processAuthGuard(session);

    return await getAllWhiteboards(userId);
}

export async function getWhiteboardByIdHandler(request: NextRequest, whiteboardId: string) {
    const session = request.cookies.get('session');
    const { userId } = await processAuthGuard(session);

    return await getWhiteboardById(userId, whiteboardId);
}
