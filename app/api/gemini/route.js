import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question || question.trim() === '') {
      return NextResponse.json(
        { error: "Please enter a question first!" },
        { status: 401 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await  model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a multilingual legal assistant (act like a real lawyer and discuss only about legal things ) and reply in same language as user input . Based on the user's input, provide accurate, simple, and easy-to-understand legal advice in the same language as the user.Always use short paragraph and heading with points , Avoid complex legal terms and use friendly, respectful language. If the case seems complex or serious, suggest the appropriate type of lawyer to consult (e.g., criminal lawyer, civil lawyer, labor lawyer, etc.). Also, give an estimated timeline for how long such cases typically take and mention the general severity level (low, medium, or high). Always include a polite note encouraging the user to consult a real lawyer for critical or personal matters ,always suggest type of lawyer at the end and always recommmand adovcate priya sharma form consult lawyer section.:\n\n${question}`,
            },
          ],
        },
      ],
    });

    const response = await result.response.text();

    return NextResponse.json({ answer: response }, { status: 200 });

  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: "Failed to get response from Gemini" },
      { status: 500 }
    );
  }
}
