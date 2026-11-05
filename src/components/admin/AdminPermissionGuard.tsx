"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type StaffRole =
  | "SUPER_ADMIN"
  | "OPERATIONS"
  | "CONTENT_MODERATION"
  | "SUPPORT";

type AdminPermission =
  | "staff:read"
  | "staff:manage"
  | "rewards:manage"
  | "predictions:manage"
  | "trivia:manage"
  | "polls:manage"
  | "fanrooms:manage"
  | "content:moderate"
  | "fans:support"
  | "players:manage"
  | "kyc:manage";

const ROLE_PERMISSIONS: Record<StaffRole, AdminPermission[]> = {
  SUPER_ADMIN: [
    "staff:read",
    "staff:manage",
    "rewards:manage",
    "predictions:manage",
    "trivia:manage",
    "polls:manage",
    "fanrooms:manage",
    "content:moderate",
    "fans:support",
    "players:manage",
    "kyc:manage",
  ],
  OPERATIONS: [
    "rewards:manage",
    "predictions:manage",
    "kyc:manage",
  ],
  CONTENT_MODERATION: [
    "trivia:manage",
    "polls:manage",
    "content:moderate",
  ],
  SUPPORT: ["fans:support"],
};

export default function AdminPermissionGuard({
  permission,
  children,
}: {
  permission: AdminPermission;
  children: ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function verifyAccess() {
      try {
        const response = await apiFetch("/api/admin/me", {
          cache: "no-store",
        });

        const data = await response.json().catch(() => ({}));

        if (!active) return;

        if (
          response.status === 403 &&
          data.code === "PASSWORD_CHANGE_REQUIRED"
        ) {
          router.replace("/admin/change-password");
          return;
        }

        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        const role = data.admin?.staffRole as StaffRole | undefined;

        if (
          !role ||
          !ROLE_PERMISSIONS[role]?.includes(permission)
        ) {
          router.replace("/admin/dashboard");
          return;
        }

        setAllowed(true);
      } catch {
        if (active) {
          router.replace("/admin/login");
        }
      } finally {
        if (active) setChecking(false);
      }
    }

    verifyAccess();

    return () => {
      active = false;
    };
  }, [permission, router]);

  if (checking || !allowed) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#10121b",
          color: "#f5b82e",
          fontFamily: "Lato, Arial, sans-serif",
        }}
      >
        Verifying staff access...
      </main>
    );
  }

  return <>{children}</>;
}
