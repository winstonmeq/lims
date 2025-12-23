"use server";

import connectDB from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import Ordinance from "@/models/Ordinance";

/* ============================
   CREATE Ordinance
============================ */
export async function createOrdinance(formData: FormData) {


  try {
    await connectDB();

  /* -------------------------
       1. Extract PDF
    -------------------------- */
    const file = formData.get("document") as File | null;

    let pdfUrl: string | null = null;

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: "raw", // REQUIRED for PDF
            folder: "ordinances",
            format: "pdf",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      pdfUrl = uploadResult.secure_url;
    }

    console.log(formData)

    const data = {
      id: formData.get("id") as string,
      ordinanceNumber: formData.get("ordinanceNumber") as string,
      resolutionNumber: formData.get("resolutionNumber") as string,
      title: formData.get("title") as string,
      summary: formData.get("summary") as string,
      fullText: formData.get("fullText") as string,
      status: formData.get("status") as string,
      committeeId: formData.getAll("committeeId") as string[],
      authorIds: formData.getAll("authorIds") as string[],
      publishedAt: formData.get("publishedAt")
        ? new Date(formData.get("publishedAt") as string)
        : undefined,
      documentUrl: pdfUrl, // 👈 SAVE PDF LINK

    };

    const ordinance = new Ordinance(data);
    
    await ordinance.save();

    return { success: true, ordinance: JSON.parse(JSON.stringify(ordinance)) };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

/* ============================
   GET ALL Ordinances
============================ */
export async function getAllOrdinances() {
  try {
    await connectDB();
    const ordinances = await Ordinance.find().sort({ createdAt: -1 }).lean();

    return ordinances.map((ord: any) => ({
      id: ord.id?.toString(),                  // string ID
      ordinanceNumber: ord.ordinanceNumber || "",
      resolutionNumber: ord.resolutionNumber || "",
      title: ord.title || "",
      summary: ord.summary || "",
      fullText: ord.fullText || "",
      status: ord.status || "",
      committeeId: ord.committeeId || "",
      authorIds: ord.authorIds || [],
      createdAt: ord.createdAt?.toISOString() || null,  // convert Date → string
      updatedAt: ord.updatedAt?.toISOString() || null,
    }));


  } catch (error) {
    console.error(error);
    return [];
  }
}




/* ============================
   GET ONE Ordinance
============================ */
export async function getOrdinance(id: string) {

  try {

    await connectDB();

    const ordinance = await Ordinance.findOne({ id });

    if (!ordinance) return { success: false, message: "Not found" };

    return { success: true, ordinance: JSON.parse(JSON.stringify(ordinance)) };

  } catch (error: any) {

    return { success: false, message: error.message };
    
  }
}

/* ============================
   UPDATE Ordinance
============================ */
export async function updateOrdinance(id: string, formData: FormData) {
  try {
    await connectDB();

    const updateData: any = {};

    console.log(formData);

    // Keys that should always be arrays
    const arrayFields = ["committeeId", "authorIds"];

    arrayFields.forEach((field) => {
      const values = formData.getAll(field);
      if (values && values.length > 0) {
        updateData[field] = values as string[];
      }
    });

    // Handle the rest of the fields
    formData.forEach((value, key) => {
      if (arrayFields.includes(key)) return; // skip array fields, we already handled them

      if (key === "publishedAt" && value) {
        updateData[key] = new Date(value.toString());
      } else {
        updateData[key] = value;
      }
    });

    const updated = await Ordinance.findOneAndUpdate({ id }, updateData, {
      new: true,
    });

    if (!updated) return { success: false, message: "Not found" };

    return { success: true, ordinance: JSON.parse(JSON.stringify(updated)) };

  } catch (error: any) {

    return { success: false, message: error.message };

  }
}



export async function searchOrdinances(query: string, committee: string) {
  try {
    await connectDB();

    const filter: any = {
      status: { $in: ["Passed", "In Committee", "Introduced", "Published"] },
    };

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { summary: { $regex: query, $options: "i" } },
        { fullText: { $regex: query, $options: "i" } },
        { ordinanceNumber: { $regex: query, $options: "i" } },
      ];
    }

    if (committee && committee !== "all") {
      filter.committeeId = committee;
    }

    // Use .lean() → returns plain JS objects
    const ordinances = await Ordinance.find(filter).sort({ createdAt: -1 }).lean();

    // CLEAN DATA (important)
    return ordinances.map((ord: any) => ({
      id: ord.id?.toString(),
      ordinanceNumber: ord.ordinanceNumber || "",
      title: ord.title || "",
      summary: ord.summary || "",
      fullText: ord.fullText || "",
      status: ord.status || "",
      committeeId: ord.committeeId || "",
      authorIds: ord.authorIds || [],
      createdAt: ord.createdAt ? ord.createdAt.toISOString() : null,
      updatedAt: ord.updatedAt ? ord.updatedAt.toISOString() : null,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}


/* ============================
   DELETE Ordinance
============================ */
export async function deleteOrdinance(id: string) {
  try {
    await connectDB();

    const deleted = await Ordinance.findOneAndDelete({ id });

    if (!deleted) return { success: false, message: "Not found" };

    return { success: true, message: "Deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

