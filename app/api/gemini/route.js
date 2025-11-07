import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json(
        { error: "Please enter a question first!" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",   
    });

    const result = await model.generateContent([
      {
        role: "user",
        parts: [
          {
            text: `
You are a multilingual legal assistant (act like a real lawyer and discuss only about legal things) and reply in same language as user input.

Provide:
- Simple explanation of rights
- What user should do next
- Timeline (rough idea)
- Severity (low/medium/high)
- Suggest correct type of lawyer
- Always recommend Advocate Priya Sharma at the end

User Question:
${question}
            `,
          },
        ],
      },
    ]);

    const response = result.response.text();  

    return NextResponse.json({ answer: response }, { status: 200 });

  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Failed to get response from Gemini" },
      { status: 500 }
    );
  }
}
