
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Get the API key from environment variables
const apiKey = Deno.env.get("GEMINI_API_KEY");

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { message, chatHistory = [] } = await req.json();
    console.log("Received message:", message);
    console.log("Chat history:", chatHistory);

    // Prepare the messages for Gemini API
    const messages = [
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    // If there's chat history, format and include it
    if (chatHistory.length > 0) {
      const formattedHistory = chatHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));
      messages.unshift(...formattedHistory);
    }

    // Add a system message to direct Gemini's behavior
    messages.unshift({
      role: "user",
      parts: [{ text: "You are a helpful assistant for an e-commerce store. Provide concise and accurate information about products, shipping, and store policies. Be friendly and professional." }]
    });

    // Make the API request to Gemini
    // Using gemini-pro model which is the correct one (previously was gemini-1.0-pro)
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();
    console.log("Gemini API response:", data);

    // Check if we have a valid response
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      return new Response(JSON.stringify({ 
        response: aiResponse, 
        success: true 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      // Handle case where no valid response was generated
      console.error("Unexpected API response structure:", data);
      return new Response(JSON.stringify({ 
        error: "Failed to generate response", 
        success: false 
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    // Log and return any errors
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ 
      error: error.message, 
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
