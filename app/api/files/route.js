import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import StoredFile from "@/models/StoredFile";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectToDatabase();

    const files = await StoredFile.find({}, { data: 0 }).sort({ createdAt: -1 });

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch files." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const files = formData.getAll("files");

    if (!files.length) {
      return NextResponse.json(
        { error: "Please upload at least one file." },
        { status: 400 }
      );
    }

    const documents = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();

        return {
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          size: file.size,
          data: Buffer.from(bytes)
        };
      })
    );

    await StoredFile.insertMany(documents);

    return NextResponse.json({
      message: `${documents.length} file(s) uploaded successfully.`
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload files." }, { status: 500 });
  }
}
