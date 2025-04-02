import { whiteboardTable } from "@/db/schema";

export type CreateWhiteboardData = Pick<typeof whiteboardTable.$inferInsert, 'name' | 'elements' | 'userId'>;

