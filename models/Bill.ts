// models/Bill.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBill extends Document {
  title: string;
  billNumber: string;
  description: string;
  status: string;
  author: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const BillSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    billNumber: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: { 
      type: String, 
      required: true,
      enum: ["Introduced", "In Committee", "First Reading", "Passed", "Rejected"],
      default: "Introduced"
    },
    author: { type: String, required: true },
    content: { type: String, required: true }, // Full text
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Prevent recompilation of model in development
const Bill: Model<IBill> = mongoose.models.Bill || mongoose.model<IBill>('Bill', BillSchema);

export default Bill;