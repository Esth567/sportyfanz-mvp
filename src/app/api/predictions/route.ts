import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(
  request: Request
) {
  try {
    const userId =
      await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        {
          error: "You must be signed in.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const matchId = Number(body.matchId);
    const prediction = String(
      body.prediction || ""
    ).trim();

    if (!matchId || !prediction) {
      return NextResponse.json(
        {
          error: "Invalid prediction.",
        },
        { status: 400 }
      );
    }

    const match = db
      .prepare(
        "SELECT id FROM matches WHERE id = ?"
      )
      .get(matchId);

    if (!match) {
      return NextResponse.json(
        {
          error: "Match not found.",
        },
        { status: 404 }
      );
    }

    const existing = db
      .prepare(`
        SELECT id
        FROM predictions
        WHERE user_id = ?
        AND match_id = ?
      `)
      .get(userId, matchId);

    if (existing) {
      return NextResponse.json(
        {
          error:
            "You have already predicted this match.",
        },
        { status: 409 }
      );
    }

    db.prepare(`
      INSERT INTO predictions
      (user_id, match_id, prediction)
      VALUES (?, ?, ?)
    `).run(
      userId,
      matchId,
      prediction
    );

    db.prepare(`
      UPDATE users
      SET fan_points = fan_points + 10
      WHERE id = ?
    `).run(userId);

    db.prepare(`
      INSERT INTO fan_point_events
      (user_id, points, reason)
      VALUES (?, ?, ?)
    `).run(
      userId,
      10,
      "Match prediction"
    );

    return NextResponse.json({
      success: true,
      points: 10,
    });

  } catch {
    return NextResponse.json(
      {
        error: "Unable to save prediction.",
      },
      { status: 500 }
    );
  }
}