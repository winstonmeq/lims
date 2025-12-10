// app/actions/auth.ts
"use server";

import bcrypt from "bcrypt";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  await connectDB();

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const sessionData = {
    userId: user._id.toString(),
    email: user.email,
    name: user.name ?? null,
  };

  const sessionString = Buffer.from(JSON.stringify(sessionData)).toString("base64");

  (await cookies()).set({
    name: "auth-session",
    value: sessionString,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Optional: redirect right here if you want
  // redirect("/admin");
}

export async function logoutAction() {
    // Delete the httpOnly session cookie
    (await
        // Delete the httpOnly session cookie
        cookies()).delete("auth-session");
  
    // Optional: redirect immediately
    redirect("/login");
  }