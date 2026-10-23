import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession, verifySession } from "@/lib/session";

export async function getAdmin() {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

// Every admin page and server action calls this; middleware is only the first line of defense.
export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function login(email, password) {
  if (!prisma) return false;
  const admin = await prisma.adminUser.findUnique({ where: { email: email.toLowerCase().trim() } });
  // Compare against a dummy hash when the user is unknown so timing doesn't reveal valid emails.
  const ok = await bcrypt.compare(password, admin?.passwordHash ?? "$2b$12$T5yBbU2AFsUM3e0IfurfVu2Q6v5q87eJdsGf.eAUbdyDvbuhEB1Yq");
  if (!admin || !ok) return false;
  const store = await cookies();
  store.set(SESSION_COOKIE, await signSession(admin), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return true;
}

export async function logout() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
