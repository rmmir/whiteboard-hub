import { NextRequest, NextResponse } from 'next/server';

import {
    createWhiteboard,
    updateWhiteboardDetailsById,
    updateWhiteboardElementsById,
} from '@/data-access/whiteboards';
import { authGuardCheck, SessionPayload } from '@/lib/session';
import {
    createWhiteboardSchema,
    updateWhiteboardDetailsSchema,
    updateWhiteboardElementsSchema,
} from '@/lib/whiteboardSchema';
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
    const payload = await authGuardCheck(session);
    if (!payload) return payload;

    const newWhiteboard: CreateWhiteboardData = {
        name: whiteboard.name,
        description: whiteboard.description,
        elements: [],
        userId: (payload as SessionPayload).userId,
    };
    console.log(newWhiteboard)
    await createWhiteboard(newWhiteboard);
}

export async function updateWhiteboardDetailsHandler(request: NextRequest, params: ParamsId) {
    const parsedResult = updateWhiteboardDetailsSchema.safeParse(await request.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const whiteboard: WhiteboardDetails = parsedResult.data;
    const session = request.cookies.get('session');
    const payload = await authGuardCheck(session);
    if (!payload) return payload;

    const updatedWhiteboardDetails: UpdateWhiteboardDetailsData = {
        name: whiteboard.name,
        description: whiteboard.description,
    };

    await updateWhiteboardDetailsById(params.id, updatedWhiteboardDetails);
}

export async function updateWhiteboardContentHandler(request: NextRequest, params: ParamsId) {
    const parsedResult = updateWhiteboardElementsSchema.safeParse(await request.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const whiteboardElements: WhiteboardElements = parsedResult.data;
    const session = request.cookies.get('session');
    const payload = await authGuardCheck(session);
    if (!payload) return payload;

    const updatedWhiteboardDetails: UpdateWhiteboardElementsData = {
        elements: whiteboardElements.elements,
    };

    await updateWhiteboardElementsById(params.id, updatedWhiteboardDetails);
}
