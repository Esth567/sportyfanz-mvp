import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "FootballFan23",
    points: 1250,
    level: "Legend",
    predictionRecord: 68
  });
}