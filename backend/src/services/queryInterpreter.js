const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

exports.interpretQuery = async (command) => {
  const prompt = `
You are a Query Interpretation AI for a multi-agent system.
Analyze the user command and respond ONLY in valid JSON with keys:

- "intent": one of ["weather", "news", "product_search", "knowledge"]
- "search_query": optimized search text for the internet
- "location": only if related to weather
- "topic": only if related to news
- "category": if product search (smartphone, laptop, smartwatch, etc.)
- "brand": if brand mentioned (Apple, Samsung, etc.)
- "minPrice": number only if lower price bound exists
- "maxPrice": number only if upper price bound exists

Intent Rules:
- Weather if mentions temperature, weather, climate, or city + "weather"
- News if mentions "news", "latest updates", "current events"
- Product search if mentions buying, "best", "phones", "laptops", price range, etc.
- Knowledge if asks a question: why, what, how, who, when, history, meaning, definition
- General otherwise

Examples:

User: "weather in Pune"
{"intent":"weather","search_query":"Pune weather","location":"Pune"}

User: "news about Virat Kohli"
{"intent":"news","search_query":"Virat Kohli news","topic":"Virat Kohli"}

User: "best Samsung phones under 15000"
{"intent":"product_search","search_query":"best Samsung smartphone under 15000","brand":"Samsung","category":"smartphone","maxPrice":15000}

User: "laptops between 40000 to 60000"
{"intent":"product_search","search_query":"laptops between 40000 and 60000","category":"laptop","minPrice":40000,"maxPrice":60000}

User: "Why is the sky blue?"
{"intent":"knowledge","search_query":"why is sky blue explained"}

User: "What is Blockchain?"
{"intent":"knowledge","search_query":"blockchain explained"}

Respond ONLY WITH JSON. No text outside JSON.

User Command: "${command}"
`;


  const completion = await client.chat.completions.create({
    model: "x-ai/grok-4.1-fast:free",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch {
    return {
      intent: "general",
      search_query: command
    };
  }
};
