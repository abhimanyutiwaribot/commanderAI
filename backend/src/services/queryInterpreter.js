const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

exports.interpretQuery = async (command) => {
  const prompt = `
You are a Query Interpretation AI for a multi-agent orchestrator.

Analyze the user command and respond ONLY in valid JSON with:

- "intent": one of ["weather", "news", "product_search", "knowledge", "gpt"]
- "search_query": only if needed by weather, news, product_search, knowledge
- "location": only if weather
- "topic": only if news
- "category": for product (smartphone, laptop, etc.)
- "brand": for product (if mentioned)
- "minPrice": number if a lower bound exists
- "maxPrice": number if an upper bound exists

INTENT RULES:
- "weather" → weather, temperature, rain, climate, city + weather
- "news" → news, headlines, updates on a person/topic
- "product_search" → best / buy / price / under / deal / list of products
- "knowledge" → who, what, why, how, history, meaning (factual info fetch)
- "gpt" → creative writing, coding, summarizing large text, translation, opinions, or anything that does NOT require web search

Examples:
User: "Write me a code for sorting numbers"
{"intent":"gpt", "search_query": "${command}"}

User: "weather Mumbai"
{"intent":"weather","search_query":"Mumbai weather","location":"Mumbai"}

User: "Summarize this text: ...."
{"intent":"gpt", "search_query": "${command}"}

User: "news about Dhoni"
{"intent":"news","search_query":"Dhoni news","topic":"Dhoni"}

User: "best laptops under 50000"
{"intent":"product_search","search_query":"best laptops under 50000","category":"laptop","maxPrice":50000}

User: "What is AI?"
{"intent":"knowledge","search_query":"what is AI explained"}

Respond ONLY IN VALID JSON. No explanation.
User Command: "${command}"
`;


  const completion = await client.chat.completions.create({
    model: "tngtech/deepseek-r1t2-chimera:free",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch {
    return {
      intent: "gpt",
      search_query: command
    };
  }
};
