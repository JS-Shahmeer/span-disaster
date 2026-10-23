import { SignJWT, jwtVerify } from "jose";

// Edge-safe session helpers, shared by middleware and server code.
export const SESSION_COOKIE = "span_admin";
export const SESSION_MAX_AGE = 60 * 60 * 8;

function key() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signSession(admin) {
  return new SignJWT({ email: admin.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(key());
}

export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    return { id: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}
