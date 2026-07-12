import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { products, Product } from "../../data/products";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const productList = products
    .map(
      (p: Product) =>
        `- ${p.name} | Category: ${p.category} | Price: $${p.price} | ${
          p.inStock ? "In Stock" : "Out of Stock"
        } | Rating: ${p.rating}/5 | ${p.description}`
    )
    .join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are ShopMind AI — a helpful shopping assistant.
        
Here are the available products:
${productList}

Help users find products based on their needs.
Recommend products, compare them, and answer questions.
Always mention price and availability.
Be friendly and helpful! 🛒`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const reply =
    completion.choices[0].message.content ||
    "Sorry, I could not process your request.";

  return NextResponse.json({ reply });
}