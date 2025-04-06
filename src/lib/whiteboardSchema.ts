import { z } from "zod";

export const createWhiteboardSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).trim(),
    description: z.string().min(3, { message: "Description must be at least 3 characters long" }).trim(),
});

export const updateWhiteboardDetailsSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters long" }).trim(),
    description: z.string().min(3, { message: "Description must be at least 3 characters long" }).trim(),
});

export const updateWhiteboardElementsSchema = z.object({
    elements: z.string(),
});
