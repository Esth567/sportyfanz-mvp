import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  hashPassword,
  createSession,
} from "@/lib/auth";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          error: "All fields are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error:
            "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const existing = db
      .prepare(
        "SELECT id FROM users WHERE email = ?"
      )
      .get(email) as
      | { id: number }
      | undefined;

    if (existing) {
      return NextResponse.json(
        {
          error:
            "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    const passwordHash =
      await hashPassword(password);

    const result = db
      .prepare(`
        INSERT INTO users
        (name, email, password_hash, fan_points)
        VALUES (?, ?, ?, ?)
      `)
      .run(
        name,
        email,
        passwordHash,
        100
      );

    const userId = Number(
      result.lastInsertRowid
    );

    db.prepare(`
      INSERT INTO fan_point_events
      (user_id, points, reason)
      VALUES (?, ?, ?)
    `).run(
      userId,
      100,
      "Welcome bonus"
    );

    await createSession(userId);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to create account.",
      },
      { status: 500 }
    );
  }
}