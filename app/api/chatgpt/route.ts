import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { question } = await req.json();

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Please add OPENAI_API_KEY from OpenAI to .env or .env.local"
      );
    }
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            content:
              "You are a knowledgeable assistant that provides quality information in bullet points",
            role: "system",
          },
          {
            content: question,
            role: "user",
          },
        ],
      }),
    });

    const responseData = await response.json();
    const reply = responseData.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
