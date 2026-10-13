
import { NextResponse } from "next/server";
import {
  createAdminSession,
  verifyPassword,
} from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const identifier =
      typeof body.identifier === "string"
        ? body.identifier.trim().toLowerCase()
        : typeof body.email === "string"
          ? body.email.trim().toLowerCase()
          : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!identifier || !password) {
      return NextResponse.json(
        {
          error:
            "Username or work email and password are required.",
        },
        { status: 400 }
      );
    }

    const admin = identifier.includes("@")
      ? await db.orm.public.AdminUser.first({
          email: identifier,
        })
      : await db.orm.public.AdminUser.first({
          username: identifier,
        });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    if (admin.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "This account is not active." },
        { status: 403 }
      );
    }

    const passwordValid = await verifyPassword(
      password,
      admin.passwordHash
    );

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid username/email or password." },
        { status: 401 }
      );
    }

    if (admin.role !== "ADMIN") {
      return NextResponse.json(
        {
          error:
            "This account is not authorised for Admin access.",
        },
        { status: 403 }
      );
    }

    await db.orm.public.AdminUser
      .where({ id: admin.id })
      .update({
        lastLoginAt: new Date().toISOString(),
      });

    await createAdminSession(admin.id);

    return NextResponse.json({
      success: true,
      mustChangePassword: admin.mustChangePassword,
      admin: {
        id: admin.id,
        email: admin.email,
        username: admin.username,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Unable to sign in to Admin." },
      { status: 500 }
    );
  }
}
