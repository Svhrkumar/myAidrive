import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/mongodb";
import StoredFile from "@/models/StoredFile";

export const runtime = "nodejs";

export async function GET(_request, { params }) {
  try {
    await connectToDatabase();

    const file = await StoredFile.findById(params.id);

    if (!file) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    return new NextResponse(file.data, {
      status: 200,
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `attachment; filename="${file.name}"`
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to download file." }, { status: 500 });
  }
}
