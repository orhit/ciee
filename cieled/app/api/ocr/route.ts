import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const response = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "system",
          content: "You are a highly precise optical engineering data extractor. Your job is to extract exact decimal values (CIE_x and CIE_y coordinates) from images. Values usually range from 0.0000 to 0.8000 and appear in pairs. You must strictly output ONLY valid JSON.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Carefully read all text and tables in this image. Extract all CIE x and y coordinates. Group them by their Bin Code or Set Name. Double-check every decimal point and digit. Output ONLY a raw JSON array of objects with the exact format: [ { \"name\": \"Bin 8285\", \"points\": [[0.5256, 0.4735], [0.5448, 0.4544]] } ]. Do NOT include markdown blocks like ```json or any other text.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      temperature: 0,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content || "";
    let data;
    try {
      const cleaned = content.replace(/```json/g, "").replace(/```/g, "").trim();
      data = JSON.parse(cleaned);
    } catch (err) {
      return NextResponse.json({ error: "Failed to parse OCR response", content }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("OCR API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
