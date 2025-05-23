import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }).trim(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).trim(),
});

export const regiserSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).trim(),
    email: z.string().email({ message: 'Invalid email address' }).trim(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).trim(),
});
