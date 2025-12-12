import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const VOICE_ID = "mActWQg9kibLro6Z2ouY";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    
    console.log("TTS request received, text length:", text?.length);
    
    if (!ELEVENLABS_API_KEY) {
      console.error("ELEVENLABS_API_KEY is not configured");
      throw new Error("API key not configured");
    }
    
    if (!text) {
      console.error("No text provided");
      throw new Error("Text is required");
    }

    console.log("Calling ElevenLabs API with voice:", VOICE_ID);

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: "POST",
      headers: { 
        "xi-api-key": ELEVENLABS_API_KEY, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ 
        text, 
        model_id: "eleven_multilingual_v2", 
        voice_settings: { 
          stability: 0.5, 
          similarity_boost: 0.75 
        } 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
    }
    
    const audioBuffer = await response.arrayBuffer();
    console.log("TTS success, audio size:", audioBuffer.byteLength);
    
    return new Response(
      JSON.stringify({ audioContent: base64Encode(audioBuffer) }), 
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("TTS function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
