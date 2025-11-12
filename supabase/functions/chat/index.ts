import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const healthResponses = {
  greeting: [
    "Hello! I'm here to help with your health questions. What would you like to know?",
    "Hi there! How can I assist you with your health journey today?",
    "Welcome! I'm your AI health assistant. What can I help you with?"
  ],
  exercise: [
    "Regular exercise is crucial for maintaining good health. I recommend starting with 30 minutes of moderate activity most days of the week. This could include brisk walking, swimming, or cycling. Always consult your doctor before starting a new exercise program.",
    "Exercise benefits include improved cardiovascular health, stronger bones and muscles, better mental health, and weight management. Try to incorporate both aerobic activities and strength training into your routine."
  ],
  nutrition: [
    "A balanced diet should include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods, added sugars, and excessive sodium. Remember, variety is key to getting all the nutrients your body needs.",
    "Good nutrition is foundational to health. Focus on eating colorful fruits and vegetables, choosing whole grains over refined ones, and including lean proteins like fish, poultry, beans, and nuts in your meals."
  ],
  sleep: [
    "Most adults need 7-9 hours of quality sleep per night. To improve sleep quality, maintain a consistent sleep schedule, create a relaxing bedtime routine, keep your bedroom cool and dark, and avoid screens before bed.",
    "Sleep is essential for physical and mental health. Poor sleep can affect your mood, concentration, immune system, and overall well-being. If you're having persistent sleep problems, consider speaking with a healthcare provider."
  ],
  stress: [
    "Managing stress is important for overall health. Try techniques like deep breathing, meditation, regular exercise, spending time in nature, and maintaining social connections. Don't hesitate to seek professional help if stress becomes overwhelming.",
    "Chronic stress can impact your physical and mental health. Practice stress-management techniques daily, such as mindfulness, yoga, journaling, or talking with friends. Remember, it's okay to ask for help when you need it."
  ],
  hydration: [
    "Staying hydrated is vital for your health. Aim for about 8 glasses of water daily, though needs vary based on activity level, climate, and individual factors. Signs of good hydration include clear or light-colored urine and feeling energized.",
    "Water is essential for nearly every bodily function. It helps regulate body temperature, transport nutrients, remove waste, and maintain energy levels. Carry a water bottle with you as a reminder to drink throughout the day."
  ],
  general: [
    "That's a great health question! While I can provide general information, remember that everyone's health needs are unique. For personalized advice, it's always best to consult with a healthcare professional who knows your medical history.",
    "I'm here to provide general health information and guidance. For specific medical concerns or conditions, please consult with a qualified healthcare provider who can give you personalized advice.",
    "Health is multifaceted and includes physical, mental, and emotional well-being. A healthy lifestyle typically involves balanced nutrition, regular exercise, adequate sleep, stress management, and regular check-ups with healthcare providers."
  ]
};

function getHealthResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
    return healthResponses.greeting[Math.floor(Math.random() * healthResponses.greeting.length)];
  }

  if (lowerMessage.match(/\b(exercise|workout|fitness|gym|activity|physical)\b/)) {
    return healthResponses.exercise[Math.floor(Math.random() * healthResponses.exercise.length)];
  }

  if (lowerMessage.match(/\b(food|eat|diet|nutrition|meal|vitamin|nutrient)\b/)) {
    return healthResponses.nutrition[Math.floor(Math.random() * healthResponses.nutrition.length)];
  }

  if (lowerMessage.match(/\b(sleep|rest|tired|insomnia|sleeping)\b/)) {
    return healthResponses.sleep[Math.floor(Math.random() * healthResponses.sleep.length)];
  }

  if (lowerMessage.match(/\b(stress|anxiety|worried|nervous|pressure)\b/)) {
    return healthResponses.stress[Math.floor(Math.random() * healthResponses.stress.length)];
  }

  if (lowerMessage.match(/\b(water|hydration|drink|hydrated|thirsty)\b/)) {
    return healthResponses.hydration[Math.floor(Math.random() * healthResponses.hydration.length)];
  }

  return healthResponses.general[Math.floor(Math.random() * healthResponses.general.length)];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, history } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "No message provided" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = getHealthResponse(message);

    return new Response(
      JSON.stringify({ response }),
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
      JSON.stringify({ error: "Failed to process message" }),
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