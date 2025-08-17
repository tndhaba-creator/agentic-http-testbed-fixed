{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // middleware.js\
export const config = \{ matcher: ["/:path*"] \};\
export default async function middleware(req) \{\
  try \{\
    const url = new URL(req.url);\
    const h = req.headers;\
    console.log("[EDGE]", JSON.stringify(\{\
      ts: new Date().toISOString(),\
      method: req.method,\
      url: url.pathname + (url.search || ""),\
      host: h.get("host") || "",\
      referer: h.get("referer") || "",\
      ua: h.get("user-agent") || "",\
      cookie_present: !!h.get("cookie"),\
      xff: h.get("x-forwarded-for") || "",\
      country: h.get("x-vercel-ip-country") || "",\
      city: h.get("x-vercel-ip-city") || ""\
    \}));\
  \} catch \{\}\
  return Response.next();\
\}\
}