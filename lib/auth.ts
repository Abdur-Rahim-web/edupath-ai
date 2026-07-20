import { SignJWT, jwtVerify } from 'jose';
import { NextRequest } from 'next/server';

export interface AuthPayload {
  userId: string;
  email: string;
  role: 'student' | 'admin';
}

const JWT_COOKIE = 'authToken';
const JWT_EXPIRY = '14d';

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined in environment variables');
  return new TextEncoder().encode(secret);
}

/** Sign a new JWT and return the token string */
export async function signToken(payload: AuthPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(getSecret());
}

/** Verify a JWT string. Returns the payload or null if invalid. */
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as AuthPayload;
  } catch {
    return null;
  }
}

/** Extract authToken cookie from a NextRequest (works in both middleware and API routes) */
export function getTokenFromRequest(req: NextRequest): string | null {
  return req.cookies.get(JWT_COOKIE)?.value ?? null;
}

/** Verify auth from a request. Returns payload or null. */
export async function getAuthPayload(req: NextRequest): Promise<AuthPayload | null> {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  return verifyToken(token);
}

export { JWT_COOKIE };
