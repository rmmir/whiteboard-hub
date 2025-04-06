import { NextRequest, NextResponse } from 'next/server';

import { login } from '@/use-cases/login';
import { catchErrorHandler } from '@/lib/errorHandler';

export async function POST(req: NextRequest) {
    try {
        const response = await login(req);
        if (response instanceof NextResponse) {
            return response;
        }

        return NextResponse.json({ message: `User logged in successfully!` });
    } catch (error) {
        return catchErrorHandler(error);
    }
}
