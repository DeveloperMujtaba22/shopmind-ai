import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { products, Product } from "../../data/products";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const productList = products
      .map(
        (p: Product) =>
          `- ${p.name} | Category: ${p.category} | Price: $${p.price} | ${
            p.inStock ? "In Stock" : "Out of Stock"
          } | Rating: ${p.rating}/5 | ${p.description}`
      )
      .join("\n");

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: `You are ShopMind AI — a helpful 
shopping assistant.

Here are the available products:
${productList}

Help users find products.
Recommend products and answer questions.
Always mention price and availability.
Be friendly! 🛒`,
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

  } catch (error) {
    console.error("Groq Error:", error);
    return NextResponse.json(
      { reply: "Sorry, something went wrong! " + error },
      { status: 500 }
    );
  }
}