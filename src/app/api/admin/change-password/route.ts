
import { NextResponse } from "next/server";
import {
  getCurrentAdminUserId,
  hashPassword,
  verifyPassword,
} from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const adminUserId = await getCurrentAdminUserId();

    if (!adminUserId) {
      return NextResponse.json(
        { error: "Please sign in first." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const currentPassword =
      typeof body.currentPassword === "string"
        ? body.currentPassword
        : "";

    const newPassword =
      typeof body.newPassword === "string"
        ? body.newPassword
        : "";

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Enter your current and new passwords." },
        { status: 400 }
      );
    }

    if (newPassword.length < 12 || newPassword.length > 128) {
      return NextResponse.json(
        { error: "Your new password must be 12–128 characters long." },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          error:
            "Choose a password different from your temporary password.",
        },
        { status: 400 }
      );
    }

    const admin = await db.orm.public.AdminUser.first({
      id: adminUserId,
    });

    if (!admin || admin.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "This account is unavailable." },
        { status: 403 }
      );
    }

    if (admin.role !== "ADMIN") {
      return NextResponse.json(
        { error: "This endpoint is for staff accounts only." },
        { status: 403 }
      );
    }

    const validCurrentPassword = await verifyPassword(
      currentPassword,
      admin.passwordHash
    );

    if (!validCurrentPassword) {
      return NextResponse.json(
        { error: "Your current password is incorrect." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(newPassword);

    await db.orm.public.AdminUser.where({
      id: adminUserId,
    }).update({
      passwordHash,
      mustChangePassword: false,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Your password has been changed successfully.",
    });
  } catch (error) {
    console.error("Staff password change failed:", error);

    return NextResponse.json(
      { error: "Unable to change your password." },
      { status: 500 }
    );
  }
}
