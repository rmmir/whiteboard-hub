import { NextRequest, NextResponse } from "next/server";

import { login } from "@/use-cases/login";

export async function POST(req: NextRequest) {
    try {
        await login(req);
        return NextResponse.json({ message: `User logged in successfully!` });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}