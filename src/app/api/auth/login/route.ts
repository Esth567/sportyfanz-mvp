import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  verifyPassword,
  createSession,
} from "@/lib/auth";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(
      body.password || ""
    );

    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    const user = db
      .prepare(`
        SELECT id, password_hash
        FROM users
        WHERE email = ?
      `)
      .get(email) as
      | {
          id: number;
          password_hash: string;
        }
      | undefined;

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(
      password,
      user.password_hash
    );

    if (!valid) {
      return NextResponse.json(
        {
          error: "Invalid email or password.",
        },
        { status: 401 }
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
    });

  } catch {
    return NextResponse.json(
      {
        error: "Unable to sign in.",
      },
      { status: 500 }
    );
  }
}