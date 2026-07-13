import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `You are ShopMind AI, a shopping assistant.

User: ${message}`,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        reply: error.message,
      },
      { status: 500 }
    );
  }
}