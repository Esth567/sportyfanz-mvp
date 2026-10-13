import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Please log in to play Trivia." },
        { status: 401 }
      );
    }

    const user = await db.orm.public.User
      .where({ id: userId })
      .first();

    if (!user || user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Your account is not active." },
        { status: 403 }
      );
    }

    const profile = await db.orm.public.FanProfile
      .where({ userId })
      .first();

    if (!profile) {
      return NextResponse.json(
        { error: "Fan profile not found." },
        { status: 404 }
      );
    }

    const questions = await db.orm.public.TriviaQuestion
      .where({ status: "ACTIVE" })
      .all();

    const attempts = await db.orm.public.TriviaAttempt
      .where({ userId })
      .all();

    const attemptedQuestionIds = new Set(
      attempts.map((attempt) => attempt.questionId)
    );

    const unansweredQuestions = questions
      .filter(
        (question) => !attemptedQuestionIds.has(question.id)
      )
      .sort((a, b) => a.id - b.id)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      balance: profile.currentPoints,
      totalPoints: profile.totalPoints,
      roundSize: 5,
      questions: unansweredQuestions.map((question) => ({
        id: question.id,
        question: question.question,
        options: [
          { value: "A", label: question.optionA },
          { value: "B", label: question.optionB },
          { value: "C", label: question.optionC },
          { value: "D", label: question.optionD },
        ],
        pointsReward: question.pointsReward,
        attempted: false,
      })),
      attemptedCount: attempts.length,
    });
  } catch (error) {
    console.error("GET /api/trivia error:", error);

    return NextResponse.json(
      { error: "Failed to load Trivia questions." },
      { status: 500 }
    );
  }
}
