export async function detectStack(url: string) {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent": "SiteCtrl Platform Detector",
      },
    });

    const html = await res.text();
    const headers = Object.fromEntries(res.headers.entries());
    const lower = html.toLowerCase();

    if (
      lower.includes("wp-content") ||
      lower.includes("wp-includes") ||
      lower.includes("/wp-json/") ||
      lower.includes("wordpress")
    ) {
      return "WordPress";
    }

    if (
      lower.includes("cdn.shopify.com") ||
      lower.includes("shopify") ||
      headers["x-shopify-stage"]
    ) {
      return "Shopify";
    }

    if (
      lower.includes("_next/static") ||
      lower.includes("__next") ||
      headers["x-powered-by"]?.toLowerCase().includes("next")
    ) {
      return "Next.js";
    }

    if (
      lower.includes("webflow") ||
      lower.includes("wf-")
    ) {
      return "Webflow";
    }

    if (
      lower.includes("wixstatic") ||
      lower.includes("wix.com")
    ) {
      return "Wix";
    }

    if (
      lower.includes("laravel") ||
      headers["set-cookie"]?.toLowerCase().includes("laravel")
    ) {
      return "Laravel";
    }

    if (
      headers["x-powered-by"]?.toLowerCase().includes("php") ||
      lower.includes(".php")
    ) {
      return "Custom PHP";
    }

    return "Other";
  } catch {
    return "Unknown";
  }
}