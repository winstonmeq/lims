// lib/auth.ts
import { cookies } from "next/headers";

export type SessionUser = {
  userId: string;
  email: string;
  name: string | null;
} | null;

export const getSession = async (): Promise<SessionUser> => {
  try {
    const cookie = (await cookies()).get("auth-session")?.value;
    if (!cookie) return null;

    const decoded = Buffer.from(cookie, "base64").toString("utf-8");
    const data = JSON.parse(decoded);

    return {
      userId: data.userId,
      email: data.email,
      name: data.name,
    };
  } catch {
    return null;
  }
};

export const destroySession = async () => {
  (await cookies()).delete("auth-session");
};