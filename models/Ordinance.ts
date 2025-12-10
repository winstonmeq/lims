import mongoose, { Schema, Document, Model } from 'mongoose';

export type OrdinanceStatus = 'Introduced' | 'In Committee' | 'First Reading' | 'Passed' | 'Rejected' | 'Published';

export interface IOrdinance extends Document {
  id: string;
  ordinanceNumber: string;
  title: string;
  summary: string;
  fullText: string;
  status: OrdinanceStatus;
  committeeId: string[];
  authorIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const OrdinanceSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    ordinanceNumber: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    fullText: { type: String, required: true },
    status: { type: String, enum: ["Introduced", "In Committee", "First Reading", "Passed", "Rejected", "Published"], required: true },
    committeeId: { type: [String], required: true },
    authorIds: { type: [String], required: true },

    publishedAt: { type: Date },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  }
);

// Prevent recompilation of model in development
const Ordinance: Model<IOrdinance> = mongoose.models.Ordinance || mongoose.model<IOrdinance>('Ordinance', OrdinanceSchema);

export default Ordinance;