import { and, eq } from 'drizzle-orm';

import { db } from '@db/index';
import { whiteboardTable } from '@/db/schema';
import {
    CreateWhiteboardData,
    UpdateWhiteboardDetailsData,
    UpdateWhiteboardElementsData,
} from '@/models/whiteboard';

export async function getAllWhiteboards(userId: string) {
    return await db.select().from(whiteboardTable).where(eq(whiteboardTable.userId, userId));
}

export async function getWhiteboardById(userId: string, id: string) {
    return await db
        .select()
        .from(whiteboardTable)
        .where(and(eq(whiteboardTable.id, id), eq(whiteboardTable.userId, userId)));
}

export async function createWhiteboard(whiteboard: CreateWhiteboardData) {
    await db.insert(whiteboardTable).values(whiteboard);
}

export async function updateWhiteboardDetailsById(
    id: string,
    whiteboardDetails: UpdateWhiteboardDetailsData,
) {
    await db.update(whiteboardTable).set(whiteboardDetails).where(eq(whiteboardTable.id, id));
}

export async function updateWhiteboardElementsById(
    id: string,
    whiteboardElements: UpdateWhiteboardElementsData,
) {
    await db.update(whiteboardTable).set(whiteboardElements).where(eq(whiteboardTable.id, id));
}
