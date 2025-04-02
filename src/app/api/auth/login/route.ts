import { NextRequest, NextResponse } from "next/server";

import { login } from "@/use-cases/login";

export async function POST(req: NextRequest) {
    try {
        const response = await login(req);
        if (response instanceof NextResponse) {
            return response;
        }

        return NextResponse.json({ message: `User logged in successfully!` });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}