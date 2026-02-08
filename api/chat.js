export default async function handler(req, res) {
  const { memory } = req.body;

  const systemPrompt = `
You are SeekMe, an advanced artificial intelligence created by Akin S. Sokpah from Liberia.
You are intelligent, respectful, globally aware, and innovative.
You help users seek knowledge, solutions, and clarity.
You proudly represent African and Liberian innovation on a global stage.
`;

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    ...memory.map(m => ({
      role: "user",
      parts: [{ text: m.text }]
    }))
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents })
    }
  );

  const data = await response.json();
  res.status(200).json({
    text: data.candidates[0].content.parts[0].text
  });
}
