// Simple in-memory cache so we don't hit Unsplash's rate limit
// (50 req/hour on a demo key) every time the same product comes up.
const cache = new Map<string, string>();

export async function getUnsplashImage(query: string): Promise<string | null> {
  if (cache.has(query)) {
    return cache.get(query)!;
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.warn("UNSPLASH_ACCESS_KEY is not set — falling back to placeholder images.");
    return null;
  }

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=squarish`,
      {
        headers: { Authorization: `Client-ID ${accessKey}` },
        // Cache each query's result for a day so repeated chats don't
        // burn through the rate limit.
        next: { revalidate: 60 * 60 * 24 },
      }
    );

    if (!res.ok) {
      console.error("Unsplash API error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const url: string | undefined = data?.results?.[0]?.urls?.small;

    if (url) {
      cache.set(query, url);
      return url;
    }
    return null;
  } catch (err) {
    console.error("Unsplash fetch failed:", err);
    return null;
  }
}