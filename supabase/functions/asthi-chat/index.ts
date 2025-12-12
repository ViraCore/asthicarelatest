import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = language === "hi"
      ? `आप अस्थि बॉट हैं, एक हड्डी स्वास्थ्य सहायक। 

महत्वपूर्ण निर्देश:
- हमेशा हिंदी में जवाब दें, चाहे user English में लिखे या Hindi में
- Hinglish style use करें जो local Indian Hindi speakers बोलते हैं
- सभी responses हिंदी script (देवनागरी) में लिखें
- Simple और friendly tone रखें
- Medical terms को आसान हिंदी में समझाएं
- कोई special characters या emojis use न करें
- हड्डियों की सेहत, osteoporosis, calcium, vitamin D, exercise के बारे में मदद करें`
      : `You are Asthi Bot, a helpful bone health assistant. Keep responses concise and friendly. Help users understand osteoporosis, bone density, calcium, vitamin D, and exercise. Do not use special characters or emojis.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    return new Response(JSON.stringify({ response: data.choices?.[0]?.message?.content || "" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
