import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import bcrypt from "bcryptjs";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "development-secret-change-this"
);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
) {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: number) {
  const token = await new SignJWT({
    userId,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();

  cookieStore.set("sportyfanz_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getCurrentUserId() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(
      "sportyfanz_session"
    )?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(
      token,
      secret
    );

    return Number(payload.userId);
  } catch {
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.set("sportyfanz_session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });
}