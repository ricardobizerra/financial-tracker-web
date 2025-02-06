import { JWTPayload, jwtVerify, JWTVerifyResult } from 'jose';

export async function verifyToken(
  token: string,
): Promise<JWTVerifyResult<JWTPayload> | null> {
  const verifiedToken = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET!),
  ).catch(() => null);

  return verifiedToken;
}
