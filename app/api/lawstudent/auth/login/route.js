import { setAuthCookie } from "@/lib/auth/cookies";
import { verifyPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/token";
import DbConnect from "@/lib/db/connectDB";
import LawStudent from "@/models/LawStudent";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await DbConnect();

    const lawstudent = await LawStudent.findOne({ email });
    if (!lawstudent || !lawstudent.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await verifyPassword(password, lawyer.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await generateToken({
      _id: lawstudent._id,
      name: lawstudent.name,
      email: lawstudent.email,
      role: "law-student",
    });

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        lawyer: {
          id: lawstudent._id,
          email: lawstudent.email,
          role: "law-student",
        },
      },
      { status: 200 }
    );

    response.cookies.set(setAuthCookie(token));
    return response;
  } catch (error) {
    console.error("Law Student login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
