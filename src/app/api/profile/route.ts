import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const user = await db.orm.public.User.first({
      id: userId,
    });

    if (!user || user.status !== "ACTIVE") {
      return NextResponse.json(
        { user: null },
        { status: 401 }
      );
    }

    const profile =
      await db.orm.public.FanProfile.first({
        userId,
      });

    if (!profile) {
      return NextResponse.json(
        { user: null },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,

        fanLevel: profile.fanLevel,

        totalPoints: profile.totalPoints,
        currentPoints: profile.currentPoints,

        matchesWatched: profile.matchesWatched,
        challengesCompleted:
          profile.challengesCompleted,

        fanRoomsJoined:
          profile.fanRoomsJoined,

        avatarUrl:
          profile.avatarUrl ?? null,
      },
    });
  } catch (error) {
    console.error("Profile API error:", error);

    return NextResponse.json(
      {
        user: null,
        error: "Unable to load profile.",
      },
      { status: 500 }
    );
  }
}