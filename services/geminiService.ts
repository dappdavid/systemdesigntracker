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

  const isProblem = topic.isQuestion;

  const prompt = isProblem
    ? `You are a Staff Principal Engineer conducting a comprehensive System Design Interview.
       Provide an exhaustive, step-by-step solution for: "${topic.title}".
       Context: ${topic.description}.
       
       You must breakdown the answer into the following distinct sections to teach the user exactly how to pass this interview:
       1. Requirements Clarification (Functional & Non-Functional requirements).
       2. Back-of-the-envelope Estimation (Traffic, Storage, Bandwidth calculations).
       3. API Design (Detailed endpoints, request/response objects).
       4. Database Schema & Data Model (SQL vs NoSQL choice, schema design).
       5. High-Level Design (Core components and how they interact).
       6. Deep Dive & Scaling (Partitioning, Replication, Caching, Load Balancing strategies specific to this problem).

       Ensure the content is detailed, technical, and educational.`
    : `You are a Senior Computer Science Professor.
       Provide an exhaustive, deep-dive explanation for the concept: "${topic.title}".
       Context: ${topic.description}.
       
       You must breakdown the explanation into the following distinct sections:
       1. Definition & Core Concept (What problem does it solve?).
       2. How it Works (Step-by-step internal mechanics).
       3. Algorithms / Strategies (Detailed types or variants).
       4. Real-world Use Cases (Where is it used in big tech?).
       5. Trade-offs (Pros vs Cons).

       Ensure the content is deep, rigorous, and exhaustive.`;

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
              description: "A brief executive summary of the topic (2-3 sentences).",
            },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: "The title of the step or section (e.g., 'Step 1: Requirements')." },
                  content: { type: Type.STRING, description: "Exhaustive textual explanation for this section. Use clear technical language." }
                },
                required: ["title", "content"]
              },
              description: "The ordered array of detailed sections/steps for the explanation.",
            },
            keyPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-5 critical takeaways or specific trade-offs.",
            },
            relatedTopics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 related system design terms to study next.",
            },
          },
          required: ["explanation", "sections", "keyPoints", "relatedTopics"],
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