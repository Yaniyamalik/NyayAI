import { NextResponse } from "next/server";
import DbConnect from "@/lib/db/connectDB";
import Lawyer from "@/models/Lawyer";

export async function GET(_, { params }) {
  try {
    await DbConnect();

    const { lawstudentId } = await params;

    const lawstudent = await Lawyer.findById(lawyerId);

    if (!lawstudent) {
      return NextResponse.json({ error: "Law Student not found " }, { status: 404 });
    }

    return NextResponse.json({ lawyer }, { status: 200 });
  } catch (error) {
    console.error("Fetch law Student by ID error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}