
import { NextResponse } from "next/server";
import { getCurrentAdminUserId } from "@/lib/auth";
import { db } from "@/lib/prisma";

export async function requireAdmin() {
  const adminUserId = await getCurrentAdminUserId();

  if (!adminUserId) {
    return {
      authorized: false as const,
      reason: "unauthenticated" as const,
      response: NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      ),
    };
  }

  const admin = await db.orm.public.AdminUser.first({
    id: adminUserId,
  });

  if (!admin || admin.status !== "ACTIVE") {
    return {
      authorized: false as const,
      reason: "inactive" as const,
      response: NextResponse.json(
        { error: "Your account is not active." },
        { status: 403 }
      ),
    };
  }

  if (admin.role !== "ADMIN") {
    return {
      authorized: false as const,
      reason: "not_admin" as const,
      response: NextResponse.json(
        { error: "Admin access is restricted." },
        { status: 403 }
      ),
    };
  }

  if (admin.mustChangePassword) {
    return {
      authorized: false as const,
      reason: "password_change_required" as const,
      response: NextResponse.json(
        {
          error:
            "Change your temporary password before accessing the Admin workspace.",
          code: "PASSWORD_CHANGE_REQUIRED",
        },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true as const,
    user: {
      id: admin.id,
      email: admin.email,
      username: admin.username,
      name: admin.name,
      role: admin.role,
      mustChangePassword: admin.mustChangePassword,
    },
  };
}
