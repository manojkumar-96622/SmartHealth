import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const healthConditions = [
  {
    condition: "Healthy Skin",
    confidence: 92,
    tips: [
      "Maintain your current skincare routine",
      "Use sunscreen daily with at least SPF 30",
      "Stay hydrated by drinking 8 glasses of water daily",
      "Get 7-9 hours of quality sleep each night",
      "Eat a balanced diet rich in vitamins and antioxidants"
    ]
  },
  {
    condition: "Mild Acne",
    confidence: 85,
    tips: [
      "Wash your face twice daily with a gentle cleanser",
      "Avoid touching your face frequently",
      "Use non-comedogenic skincare products",
      "Consider using products with salicylic acid or benzoyl peroxide",
      "Consult a dermatologist if condition persists"
    ]
  },
  {
    condition: "Dry Skin",
    confidence: 88,
    tips: [
      "Use a rich moisturizer twice daily",
      "Avoid hot showers and use lukewarm water",
      "Use a humidifier in dry environments",
      "Drink plenty of water throughout the day",
      "Choose gentle, fragrance-free skincare products"
    ]
  },
  {
    condition: "Sun Damage",
    confidence: 79,
    tips: [
      "Always wear broad-spectrum sunscreen SPF 30+",
      "Seek shade during peak sun hours (10am-4pm)",
      "Wear protective clothing and a wide-brimmed hat",
      "Use vitamin C serum to help repair damage",
      "Schedule a dermatology appointment for evaluation"
    ]
  },
  {
    condition: "Normal Variation",
    confidence: 90,
    tips: [
      "Continue with regular health maintenance",
      "Stay active with at least 30 minutes of exercise daily",
      "Eat a balanced diet with plenty of fruits and vegetables",
      "Get regular check-ups with your healthcare provider",
      "Practice good hygiene and self-care habits"
    ]
  }
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { image } = await req.json();

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const randomIndex = Math.floor(Math.random() * healthConditions.length);
    const result = healthConditions[randomIndex];

    return new Response(
      JSON.stringify(result),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to analyze image" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});