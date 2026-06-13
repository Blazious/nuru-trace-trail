import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getServerConfig } from "../config.server";

const messageSchema = z.object({
  role: z.enum(["assistant", "user"]),
  text: z.string().trim().min(1).max(2_000),
});

const chatInputSchema = z.object({
  message: z.string().trim().min(1).max(2_000),
  history: z.array(messageSchema).max(12).default([]),
});

type GeminiResponse = {
  candidates?: Array<{
    finishReason?: string;
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

const systemInstruction = [
  "You are Nuru Assistant for NuruTrace Labs, a Nairobi-based blockchain intelligence company.",
  "Help visitors understand services: blockchain forensics, crypto investigations, VASP compliance, bank and MFI advisory, legal education, research, and applied blockchain solutions.",
  "Keep replies to 1-3 complete sentences. Be warm, direct, and specific.",
  "For greetings, respond with a brief welcome and ask what the visitor needs.",
  "For 'what is this platform about' questions, explain that NuruTrace helps teams understand, trace, and manage crypto and blockchain activity across investigations, compliance, training, and applied solutions.",
  "Ask one clarifying question when needed.",
  "Do not provide legal, financial, or investigative conclusions. For urgent law-enforcement matters, tell users to email info@nurutrace.co.ke with [URGENT-LEA] in the subject.",
  "When a user wants pricing, a demo, or detailed engagement scope, direct them to the contact page or info@nurutrace.co.ke.",
].join(" ");

function toGeminiRole(role: "assistant" | "user") {
  return role === "assistant" ? "model" : "user";
}

function getGeminiText(data: GeminiResponse) {
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  if (!text) {
    return undefined;
  }

  if (data.candidates?.[0]?.finishReason === "MAX_TOKENS" && !/[.!?)]$/.test(text)) {
    return `${text}.`;
  }

  return text;
}

export const askNuruAssistant = createServerFn({ method: "POST" })
  .inputValidator(chatInputSchema)
  .handler(async ({ data }) => {
    const config = getServerConfig();

    if (!config.geminiApiKey) {
      return {
        reply:
          "Gemini is not configured yet. Add GEMINI_API_KEY on the server, then I can answer with live AI guidance. For now, email info@nurutrace.co.ke or use the contact page.",
        source: "missing-key" as const,
      };
    }

    const contents = [
      ...data.history.map((message) => ({
        role: toGeminiRole(message.role),
        parts: [{ text: message.text }],
      })),
      {
        role: "user",
        parts: [{ text: data.message }],
      },
    ];

    const modelName = config.geminiModel.trim().replace(/^models\//, "");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-goog-api-key": config.geminiApiKey,
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemInstruction }],
          },
          contents,
          generationConfig: {
            maxOutputTokens: 360,
            candidateCount: 1,
          },
        }),
      },
    );

    const result = (await response.json()) as GeminiResponse;

    if (!response.ok) {
      console.error("Gemini API error:", result.error?.message ?? response.statusText);
      return {
        reply:
          "I couldn't reach the AI service just now. Please try again in a moment, or contact info@nurutrace.co.ke for direct help.",
        source: "api-error" as const,
      };
    }

    return {
      reply:
        getGeminiText(result) ??
        "I couldn't generate a clear answer just now. Try rephrasing your question, or contact info@nurutrace.co.ke for direct help.",
      source: "gemini" as const,
    };
  });
