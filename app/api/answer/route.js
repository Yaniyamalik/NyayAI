import { NextResponse } from 'next/server';
import Answer from "@/models/Answer";
import DbConnect from "@/lib/db/connectDB";
import User from "@/models/User"; 
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { answerText, questionId, userId } = await req.json();

    if (!answerText || !questionId || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await DbConnect();

    const newAnswer = await Answer.create({ answerText, questionId, userId });
    return NextResponse.json({ message: "Answer saved", answer: newAnswer }, { status: 200 });
  } catch (error) {
    console.error("Answer Save Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const questionId = searchParams.get("questionId");
  
      if (!questionId) {
        return NextResponse.json({ error: "Missing questionId" }, { status: 400 });
      }
  
      await DbConnect();
  
      const answers = await Answer.find({ questionId })
      console.log("Fetched answers: ", answers);

      return NextResponse.json({ answers }, { status: 200 });
    } catch (err) {
      console.error("Error fetching answers:", err);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  }