import { NextResponse } from 'next/server';

export async function catchErrorHandler(error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
}
