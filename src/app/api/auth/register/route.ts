import { NextRequest, NextResponse } from "next/server";
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(req: NextRequest) {

}