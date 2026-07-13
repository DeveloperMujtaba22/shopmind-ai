import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products, Product } from "../../data/products";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const productList = products
      .map(
        (p: Product) =>
          `- ${p.name} | Category: ${p.category} | 
           Price: $${p.price} | ${
             p.inStock ? "In Stock" : "Out of Stock"
           } | Rating: ${p.rating}/5 | ${p.description}`
      )
      .join("\n");

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `You are ShopMind AI — a helpful 
shopping assistant.

Here are the available products:
${productList}

Help users find products based on their needs.
Recommend products, compare them, and answer questions.
Always mention price and availability.
Be friendly and helpful! 🛒

User question: ${message}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { reply: "Sorry, something went wrong!" },
      { status: 500 }
    );
  }
}