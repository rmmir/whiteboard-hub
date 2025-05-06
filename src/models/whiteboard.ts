import { whiteboardTable } from '@/db/schema';
import { ExcalidrawElement } from '@excalidraw/excalidraw/element/types';

export type CreateWhiteboardData = Pick<
    typeof whiteboardTable.$inferInsert,
    'name' | 'description' | 'elements' | 'userId'
>;

export type UpdateWhiteboardDetailsData = Pick<
    typeof whiteboardTable.$inferInsert,
    'name' | 'description'
>;

export type UpdateWhiteboardElementsData = Pick<typeof whiteboardTable.$inferInsert, 'elements'>;

export type WhiteboardDetails = { name: string; description: string };

export type WhiteboardElements = { elements: string };

export type Whiteboard = {
    id: string;
    name: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
    elements: ExcalidrawElement[];
};
