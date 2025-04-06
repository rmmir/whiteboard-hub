import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';

import { whiteboardTable } from '@/db/schema';
import {
    CreateWhiteboardData,
    UpdateWhiteboardDetailsData,
    UpdateWhiteboardElementsData,
} from '@/models/whiteboard';

const db = drizzle(process.env.DATABASE_URL!);

export async function getAllWhiteboards() {
    return await db.select().from(whiteboardTable);
}

export async function getWhiteboardById(id: string) {
    return await db.select().from(whiteboardTable).where(eq(whiteboardTable.id, id));
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
