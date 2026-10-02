import { NextResponse } from "next/server";
import { matches } from "@/data/site";

export async function GET() {
  return NextResponse.json({
    matches
  });
} 