import { products } from "@/data/products";

const unavailable = "We couldn’t send your enquiry. Please email skesanjay9@gmail.com or call +91 98815 52345.";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Please send your enquiry from our website." }, { status: 403 });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Invalid request format." }, { status: 415 });
  }

  let data: Record<string, unknown>;
  try {
    // Bound the body while reading; do not trust Content-Length from a caller.
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Missing body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20000) {
        await reader.cancel();
        return Response.json({ error: "Your message is too long." }, { status: 413 });
      }
      chunks.push(value);
    }
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid body");
    data = body;
  } catch {
    return Response.json({ error: "Please check your enquiry and try again." }, { status: 400 });
  }

  const limits = { name: 100, company: 150, email: 254, phone: 30, product: 150, message: 3000, website: 200 };
  const fields: Record<string, string> = {};
  for (const [key, maxLength] of Object.entries(limits)) {
    const value = data[key] ?? "";
    if (typeof value !== "string" || value.trim().length > maxLength) {
      return Response.json({ error: "Please check the length and format of your enquiry." }, { status: 400 });
    }
    fields[key] = value.trim();
  }
  if (fields.website) return Response.json({ error: "Unable to submit this enquiry." }, { status: 400 });
  if (fields.product && !products.some((product) => product.name === fields.product)) {
    return Response.json({ error: "Please choose a product from the list or select General enquiry." }, { status: 400 });
  }
  if (!fields.name || !fields.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return Response.json({ error: "Please enter your name, a valid email address, and a message." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!apiKey || !from || !to) return Response.json({ error: unavailable }, { status: 503 });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: "New website enquiry — Shree Krishnna Enterprises",
        text: `Name: ${fields.name}\nCompany: ${fields.company || "Not provided"}\nEmail: ${fields.email}\nPhone: ${fields.phone || "Not provided"}\nProduct / service: ${fields.product || "General enquiry"}\n\nMessage:\n${fields.message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    const result = await response.json();
    if (!response.ok || typeof result.id !== "string") throw new Error("Email service failed");
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: unavailable }, { status: 502 });
  }
}
