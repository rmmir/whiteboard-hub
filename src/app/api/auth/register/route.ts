import { NextRequest, NextResponse } from 'next/server';

import { register } from '@/use-cases/register';
import { catchErrorHandler } from '@/lib/errorHandler';

export async function POST(req: NextRequest) {
    try {
        const response = await register(req);
        if (response instanceof NextResponse) {
            return response;
        }

        return NextResponse.json({ message: `User registered successfully!` });
    } catch (error) {
        return catchErrorHandler(error);
    }
}
