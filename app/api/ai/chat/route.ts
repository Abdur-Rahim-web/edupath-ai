import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import Course from '@/models/Course';
import connectToDatabase from '@/lib/mongodb';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json({ message: 'GEMINI_API_KEY is not configured in .env.local' }, { status: 500 });
  }

  try {
    await connectToDatabase();
    
    // Get all courses from the database to supply context to the model
    const courses = await Course.find({});
    
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ message: 'Invalid request: messages array is required' }, { status: 400 });
    }

    // Format the course list as context
    const coursesContext = courses.map(c => 
      `- Title: ${c.title}\n  Category: ${c.category}\n  Level: ${c.level}\n  Price: ${c.price === 0 ? 'Free' : `$${c.price}`}\n  Instructor: ${c.instructor}\n  Description: ${c.description}`
    ).join('\n\n');

    const systemInstruction = `You are a helpful and premium AI Chat Assistant for "EduPath AI", an online learning platform.
Here is the official list of courses currently available on our platform:
${coursesContext}

Use this information to answer user inquiries about course recommendations, details, pricing, level suitability, etc. If the user asks about a course not in this list, politely let them know we don't have it yet but suggest similar courses from our active catalog. 
Keep your tone professional, encouraging, and clear. Format replies in markdown. Keep answers concise.`;

    const ai = new GoogleGenAI({ apiKey });

    // Gemini SDK requires history to start with role 'user'.
    // The frontend seeds an initial assistant greeting, so we strip
    // any leading 'model' turns before constructing the history.
    const rawHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    // Drop consecutive leading model-role messages
    let historyStart = 0;
    while (historyStart < rawHistory.length && rawHistory[historyStart].role === 'model') {
      historyStart++;
    }
    const history = rawHistory.slice(historyStart);

    const latestMessage = messages[messages.length - 1].content;

    const contents = [...history, { role: 'user', parts: [{ text: latestMessage }] }];

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const text = response.text || '';

    return NextResponse.json({ reply: text }, { status: 200 });
  } catch (error: any) {
    console.error('Gemini Chat API Error:', error);
    return NextResponse.json({ message: 'AI Chat service is currently unavailable', error: error.message }, { status: 503 });
  }
}
