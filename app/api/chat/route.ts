import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { products } from "../../data/products";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // Give the model the catalog so it can pick relevant products.
    const catalog = products
      .map(
        (p) =>
          `id:${p.id} | ${p.name} | ${p.category} | $${p.price} | rating:${p.rating} | ${
            p.inStock ? "in stock" : "out of stock"
          }`
      )
      .join("\n");

    const systemPrompt = `You are ShopMind AI, a shopping assistant for this store.

Here is the current product catalog:
${catalog}

When the user asks about products (browsing, searching, filtering by price/category/etc), respond with ONLY a JSON object — no extra text, no markdown fences — in this exact shape:
{"reply": "<short conversational reply>", "productIds": [<matching product id numbers>]}

If the user is not asking about products (greeting, small talk, general question), use the same JSON shape with an empty productIds array.
Only ever include productIds that exist in the catalog above. Never invent products or ids.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const raw = completion.choices[0].message.content ?? "";

    let reply = raw;
    let matchedProducts: typeof products = [];

    try {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      reply = typeof parsed.reply === "string" ? parsed.reply : raw;
      const ids: number[] = Array.isArray(parsed.productIds) ? parsed.productIds : [];
      matchedProducts = products.filter((p) => ids.includes(p.id));
    } catch {
      // Model didn't return valid JSON (e.g. it just chatted normally) —
      // fall back to showing the raw text with no product cards.
    }

    return NextResponse.json({
      reply,
      products: matchedProducts,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { reply: "Sorry, something went wrong.", products: [] },
      { status: 500 }
    );
  }
}