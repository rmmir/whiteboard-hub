import { NextRequest, NextResponse } from "next/server";

import { createWhiteboard } from "@/data-access/whiteboards";
import { decrypt } from "@/lib/session";
import { createWhiteboardSchema } from "@/lib/whiteboardSchema";
import { CreateWhiteboardData } from "@/models/whiteboard";
import { getUserById } from "@/data-access/users";

export async function createWhiteboardHandler(request: NextRequest) {
    const parsedResult = createWhiteboardSchema.safeParse(await request.json());
    if (!parsedResult.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const whiteboard: { name: string } = parsedResult.data;
    const session = request.cookies.get('session');
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await decrypt(session.value);
    if (!payload) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await getUserById(payload.userId);
    
    if (user.length === 0) {
        return NextResponse.json({ error: `Invalid userId: ${payload.userId}`, status: 400 });
    }

    const newWhiteboard: CreateWhiteboardData = {
        name: whiteboard.name,
        elements: [],
        userId: payload.userId,
    };

    await createWhiteboard(newWhiteboard);
}