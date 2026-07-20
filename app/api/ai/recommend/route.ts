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
    const courses = await Course.find({});

    const body = await req.json();
    const { userName, enrolledCourses } = body;

    const coursesList = courses.map(c => 
      `ID: ${c._id}\nTitle: ${c.title}\nCategory: ${c.category}\nLevel: ${c.level}\nPrice: ${c.price === 0 ? 'Free' : `$${c.price}`}\nDescription: ${c.description}`
    ).join('\n\n');

    const prompt = `You are a machine-learning recommendation engine for "EduPath AI".
We need to recommend the top 2 best matching courses for a user named "${userName || 'Student'}".
The user has the following enrolled course titles: ${JSON.stringify(enrolledCourses || [])}.

Here is the list of ALL available courses on our platform:
${coursesList}

Based on their enrollment history, or general interest trending topics if they have no enrolled courses, pick the top 2 courses.
Your response MUST be a valid JSON array of course ID strings. Do NOT include markdown backticks or extra text, just the raw JSON.
Example output format: ["6c5378b...", "199004d..."]`;

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    let text = response.text?.trim() || '';
    
    if (text.startsWith('```json')) {
      text = text.substring(7, text.length - 3).trim();
    } else if (text.startsWith('```')) {
      text = text.substring(3, text.length - 3).trim();
    }

    let recommendedIds: string[] = [];
    try {
      recommendedIds = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse Gemini recommendations JSON:', text);
      recommendedIds = courses.slice(0, 2).map(c => c._id.toString());
    }

    const recommendedCourses = await Course.find({
      _id: { $in: recommendedIds }
    });

    return NextResponse.json({ recommendations: recommendedCourses }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Gemini Recommendation API Error:', error);
    return NextResponse.json({ message: 'AI Recommendation service is currently unavailable', error: error.message }, { status: 503 });
  }
}
