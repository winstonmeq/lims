"use server";

import bcrypt from "bcrypt";
import connectDB from "@/lib/db";

import User from "@/models/User";

export async function signupAction({ name, email, password }: { name: string; email: string; password: string }) {
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashedPassword });
  return { message: "User created", user };
}
