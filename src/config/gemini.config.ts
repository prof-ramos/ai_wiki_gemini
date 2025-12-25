/**
 * Gemini AI Configuration
 * Centralizes all AI-related configuration for the platform
 */

export const GEMINI_CONFIG = {
  // API Configuration
  apiKey: process.env.API_KEY || '',

  // Model Selection
  models: {
    flash: 'gemini-3-flash-preview',      // Fast, for simple tasks
    pro: 'gemini-3-pro-preview',          // Advanced reasoning
    default: 'gemini-3-flash-preview',
  },

  // Generation Parameters
  generation: {
    temperature: 0.7,              // Balanced creativity/precision
    maxTokens: 2048,
    topP: 0.9,
    topK: 40,
  },

  // System Instructions per Context
  systemInstructions: {
    legal: "Você é um assistente jurídico experiente, preciso e formal. Responda em Português do Brasil.",
    examPrep: "Você é um mentor especialista em concursos públicos brasileiros. Seja didático, objetivo e use exemplos práticos.",
    drafting: "Você é um redator jurídico especializado. Use linguagem técnica precisa e formatação adequada.",
    general: "Você é um assistente útil e prestativo. Responda em Português do Brasil.",
  },
} as const;

// Validation
if (!GEMINI_CONFIG.apiKey) {
  console.warn('⚠️  API_KEY não configurada. Funcionalidades de IA não funcionarão.');
}

export type GeminiModel = typeof GEMINI_CONFIG.models[keyof typeof GEMINI_CONFIG.models];
export type SystemInstructionContext = keyof typeof GEMINI_CONFIG.systemInstructions;
