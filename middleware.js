export const config = { matcher: ["/:path*"] };
export default async function middleware(req) {
  try {
    const url = new URL(req.url);
    const h = req.headers;
    const entry = {
      ts: new Date().toISOString(),
      method: req.method,
      url: url.pathname + (url.search || ""),
      host: h.get("host") || "",
      referer: h.get("referer") || "",
      ua: h.get("user-agent") || "",
      cookie_present: !!h.get("cookie"),
      xff: h.get("x-forwarded-for") || "",
      country: h.get("x-vercel-ip-country") || "",
      city: h.get("x-vercel-ip-city") || ""
    };
    console.log("[EDGE]", JSON.stringify(entry));
  } catch(e){ console.log("[EDGE_ERR]", e.message); }
  return Response.next();
}
