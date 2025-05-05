import { NextResponse } from 'next/server';
import Question from '@/models/Question';
import DbConnect from "@/lib/db/connectDB";

export async function POST(req) {
  try {
    const { question, userId } = await req.json();

    if (!question || question.trim() === '') {
      return NextResponse.json({ error: 'Please enter a question first!' }, { status: 400 });
    }

    await DbConnect();
    const savedQuestion = await Question.create({ question, userId });

    return NextResponse.json({ message: savedQuestion }, { status: 200 });
  } catch (error) {
    console.error('Error in saving question:', error);
    return NextResponse.json({ error: 'Question not saved properly' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await DbConnect();
    const questions = await Question.find().sort({ createdAt: -1 });
    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Could not fetch questions' }, { status: 500 });
  }
}
