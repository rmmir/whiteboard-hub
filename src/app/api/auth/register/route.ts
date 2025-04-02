import { NextRequest, NextResponse } from "next/server";

import { register } from "@/use-cases/register";

export async function POST(req: NextRequest) {
    try {
        const response = await register(req);
        if (response instanceof NextResponse) {
            return response;
        }
        
        return NextResponse.json({ message: `User registered successfully!` });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
}