import { GoogleGenAI } from "@google/genai";
import { GEMINI_CONFIG } from "@config/gemini.config";
import type { AIResponse } from "@shared/types";

/**
 * Gemini AI Client
 * Provides a typed interface for interacting with Google's Gemini AI
 */

// Initialize AI client
const ai = new GoogleGenAI({
  apiKey: GEMINI_CONFIG.apiKey
});

interface GenerateOptions {
  model?: string;
  systemInstruction?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Generate a completion from Gemini AI
 * @param promptText - The user's prompt
 * @param options - Configuration options
 * @returns AI-generated response
 */
export const generateCompletion = async (
  promptText: string,
  options: GenerateOptions = {}
): Promise<string> => {
  try {
    const {
      model = GEMINI_CONFIG.models.default,
      systemInstruction = GEMINI_CONFIG.systemInstructions.general,
      temperature = GEMINI_CONFIG.generation.temperature,
    } = options;

    const response = await ai.models.generateContent({
      model,
      contents: promptText,
      config: {
        systemInstruction,
        temperature,
      }
    });

    return response.text || "Não foi possível gerar uma resposta. Tente novamente.";
  } catch (error: unknown) {
    console.error("❌ Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    throw new Error(`Falha ao comunicar com a IA: ${errorMessage}`);
  }
};

/**
 * Generate a completion with full response metadata
 */
export const generateCompletionWithMetadata = async (
  promptText: string,
  options: GenerateOptions = {}
): Promise<AIResponse> => {
  const model = options.model || GEMINI_CONFIG.models.default;
  const content = await generateCompletion(promptText, options);

  return {
    content,
    model,
    // Note: Gemini SDK may not expose token usage in all versions
    // Add usage data here if available from the SDK
  };
};

/**
 * Check if API key is configured
 */
export const isApiKeyConfigured = (): boolean => {
  return Boolean(GEMINI_CONFIG.apiKey && GEMINI_CONFIG.apiKey.length > 0);
};
