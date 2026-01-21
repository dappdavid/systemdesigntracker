import { GoogleGenAI, Type } from "@google/genai";
import { Topic, AIResponse } from "../types";

const apiKey = process.env.API_KEY || '';
// Initialize safe access to API
const getAiClient = () => {
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const explainTopic = async (topic: Topic): Promise<AIResponse> => {
  const ai = getAiClient();
  if (!ai) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const prompt = topic.isQuestion
    ? `Provide a high-level system design breakdown for: "${topic.title}". 
       Focus on: ${topic.description}.
       Structure the response with a main summary, key components/challenges (as key points), and related concepts.`
    : `Explain the system design concept: "${topic.title}".
       Context: ${topic.description}.
       Provide a clear explanation, when to use it, and pros/cons (as key points).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: {
              type: Type.STRING,
              description: "A comprehensive 2-3 paragraph explanation of the topic or solution.",
            },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-5 key takeaways, trade-offs, or components.",
            },
            relatedTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 related system design terms to study next.",
            },
          },
          required: ["explanation", "keyPoints", "relatedTopics"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AIResponse;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};
