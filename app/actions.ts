'use server'

import connectDB from "../lib/db";
import Bill from "@/models/Bill";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBill(formData: FormData) {
  await connectDB();

  const title = formData.get("title") as string;
  const billNumber = formData.get("billNumber") as string;
  const description = formData.get("description") as string;
  const author = formData.get("author") as string;
  const status = formData.get("status") as string;
  const content = formData.get("content") as string;

  try {
    await Bill.create({
      title,
      billNumber,
      description,
      author,
      status,
      content,
    });
  } catch (error) {
    console.error("Error creating bill:", error);
    throw new Error("Failed to create bill");
  }

  revalidatePath("/bills");
  redirect("/bills");
}

export async function getBills() {
  await connectDB();
  try {
    // .lean() returns a plain JS object instead of a Mongoose Document
    const bills = await Bill.find({}).sort({ createdAt: -1 }).lean();
    
    // Convert _id and dates to strings to avoid serialization warnings in Next.js
    return bills.map(bill => ({
      ...bill,
      _id: bill._id.toString(),
      createdAt: bill.createdAt.toISOString(),
      updatedAt: bill.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBillById(id: string) {
  await connectDB();
  try {
    const bill = await Bill.findById(id).lean();
    if (!bill) return null;

    return {
      ...bill,
      _id: bill._id.toString(),
      createdAt: bill.createdAt.toISOString(),
      updatedAt: bill.updatedAt.toISOString(),
    };
  } catch (error) {
    return null;
  }
}