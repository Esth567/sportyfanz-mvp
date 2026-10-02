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

    const pollId = Number(body.pollId);
    const optionId = Number(body.optionId);

    if (!pollId || !optionId) {
      return NextResponse.json(
        {
          error: "Invalid vote.",
        },
        { status: 400 }
      );
    }

    const option = db
      .prepare(`
        SELECT id
        FROM poll_options
        WHERE id = ?
        AND poll_id = ?
      `)
      .get(optionId, pollId);

    if (!option) {
      return NextResponse.json(
        {
          error: "Invalid poll option.",
        },
        { status: 400 }
      );
    }

    const existing = db
      .prepare(`
        SELECT id
        FROM poll_votes
        WHERE poll_id = ?
        AND user_id = ?
      `)
      .get(pollId, userId);

    if (existing) {
      return NextResponse.json(
        {
          error:
            "You have already voted in this poll.",
        },
        { status: 409 }
      );
    }

    const transaction = db.transaction(() => {

      db.prepare(`
        INSERT INTO poll_votes
        (poll_id, option_id, user_id)
        VALUES (?, ?, ?)
      `).run(
        pollId,
        optionId,
        userId
      );

      db.prepare(`
        UPDATE poll_options
        SET votes = votes + 1
        WHERE id = ?
      `).run(optionId);

      db.prepare(`
        UPDATE users
        SET fan_points = fan_points + 5
        WHERE id = ?
      `).run(userId);

      db.prepare(`
        INSERT INTO fan_point_events
        (user_id, points, reason)
        VALUES (?, ?, ?)
      `).run(
        userId,
        5,
        "Poll participation"
      );

    });

    transaction();

    return NextResponse.json({
      success: true,
      points: 5,
    });

  } catch {
    return NextResponse.json(
      {
        error: "Unable to save vote.",
      },
      { status: 500 }
    );
  }
}