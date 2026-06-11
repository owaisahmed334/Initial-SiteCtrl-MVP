export async function detectStack(url: string) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const html = await res.text();
    const headers = Object.fromEntries(res.headers.entries());
    const lower = html.toLowerCase();
    if (lower.includes("wp-content") || lower.includes("/wp-json/")) return "WordPress";
    if (lower.includes("cdn.shopify.com") || headers["x-shopify-stage"]) return "Shopify";
    if (lower.includes("webflow")) return "Webflow";
    if (headers["x-powered-by"]?.toLowerCase().includes("next")) return "Next.js";
    return "Custom / Unknown";
  } catch {
    return "Unknown";
  }
}
