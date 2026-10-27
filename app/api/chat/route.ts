import OpenAI from "openai";
//APIキー確認
console.log(process.env.OPENAI_API_KEY);
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  //OpenAIへ送信
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: message }],
  });

  //AIの返答文だけ取り出す
  return Response.json({
    reply: response.choices[0].message.content,
  });
}
