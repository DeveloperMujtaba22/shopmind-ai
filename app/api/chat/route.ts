import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { products, Product } from "../../data/products";
import { getUnsplashImage } from "../../lib/unsplash";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const CATEGORIES = Array.from(new Set(products.map((p) => p.category)));

interface Filters {
  category: string | null;
  maxPrice: number | null;
  minRating: number | null;
  keywords: string | null;
  isGreeting: boolean;
}

function applyFilters(filters: Filters): Product[] {
  return products.filter((p) => {
    if (
      filters.category &&
      p.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }
    if (filters.maxPrice != null && p.price > filters.maxPrice) {
      return false;
    }
    if (filters.minRating != null && p.rating < filters.minRating) {
      return false;
    }
    if (filters.keywords) {
      const kw = filters.keywords.toLowerCase();
      const haystack = `${p.name} ${p.description}`.toLowerCase();
      if (!haystack.includes(kw)) {
        return false;
      }
    }
    return true;
  });
}

// Resolve real Unsplash photos for the matched products, falling back to
// the static placeholder in products.ts if the API call fails or is unset.
async function withRealImages(matched: Product[]): Promise<Product[]> {
  return Promise.all(
    matched.map(async (p) => {
      const unsplashImage = await getUnsplashImage(p.name);
      return unsplashImage ? { ...p, image: unsplashImage } : p;
    })
  );
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    // The model's ONLY job is to extract filter intent as JSON.
    // The actual filtering happens deterministically in code below,
    // so a small model guessing product IDs can never return wrong products.
    const systemPrompt = `You are an intent parser for a shopping assistant.
Valid categories in this store: ${CATEGORIES.join(", ")}.

Given the user's message, respond with ONLY a JSON object, no extra text, no markdown fences, in this exact shape:
{
  "category": "<one of the valid categories above, or null if not specified>",
  "maxPrice": <number or null>,
  "minRating": <number or null>,
  "keywords": "<a single relevant keyword from the message, or null>",
  "isGreeting": <true if this is just a greeting/small talk with no product intent, else false>,
  "reply": "<a short, natural one-sentence reply to show the user, e.g. 'Here are the electronics under $1000:' or a friendly greeting if isGreeting is true>"
}

Only use categories from the valid list above. Never invent a category.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    const raw = completion.choices[0].message.content ?? "";

    let reply = "Here's what I found:";
    let matchedProducts: Product[] = [];

    try {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);

      reply = typeof parsed.reply === "string" ? parsed.reply : reply;

      if (!parsed.isGreeting) {
        const filters: Filters = {
          category:
            typeof parsed.category === "string" &&
            CATEGORIES.some(
              (c) => c.toLowerCase() === parsed.category.toLowerCase()
            )
              ? parsed.category
              : null,
          maxPrice: typeof parsed.maxPrice === "number" ? parsed.maxPrice : null,
          minRating:
            typeof parsed.minRating === "number" ? parsed.minRating : null,
          keywords:
            typeof parsed.keywords === "string" ? parsed.keywords : null,
          isGreeting: false,
        };
        matchedProducts = applyFilters(filters);
      }
    } catch {
      // Model didn't return valid JSON — fall back to a plain reply, no cards.
      reply = raw || "Sorry, I didn't quite catch that — could you rephrase?";
    }

    const productsWithImages = await withRealImages(matchedProducts);

    return NextResponse.json({
      reply,
      products: productsWithImages,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { reply: "Sorry, something went wrong.", products: [] },
      { status: 500 }
    );
  }
}