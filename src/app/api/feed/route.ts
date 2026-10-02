import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    posts: [
      {
        author: "RiversUnitedFan",
        text: "Rivers United played so well today!"
      },
      {
        author: "FootballTalkFan",
        text: "Which team will win the NPFL this season?"
      }
    ]
  });
}