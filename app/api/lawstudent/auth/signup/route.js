import { setAuthCookie } from "@/lib/auth/cookies";
import { hashPassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/token";
import DbConnect from "@/lib/db/connectDB";
import LawStudent from "@/models/LawStudent";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      name,
      email,
      password,
      phone,
      location,
      languages,
      qualification,
      university,
      rating,
      answer,
      gender,
      age,
      role,
      category,
      bio,
      profilePhoto,
      availability,
    } = await req.json();

    if (
      !name ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.length < 8
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await DbConnect();

    // Check if lawyer already exists
    const existing = await LawStudent.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Law student already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const lawstudent= await Lawyer.create({
        name,
        email,
        password,
        phone,
        location,
        languages,
        qualification,
        university,
        rating,
        answer,
        gender,
        age,
        role,
        category,
        bio,
        profilePhoto,
        availability,
        role:"law-student",
      isVerified: false,
    });

    const token = await generateToken({
      _id: lawstudent._id,
      name: lawstudent.name,
      email: lawstudent.email,
      role: "law-student",
    });

    const response = NextResponse.json(
      {
        message: "Law Student signed up successfully",
        lawyer: {
          id: lawyer._id,
          email: lawyer.email,
          role: "lawyer",
        },
      },
      { status: 201 }
    );

    response.cookies.set(setAuthCookie(token));
    return response;
  } catch (error) {
    console.error("Law student signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
