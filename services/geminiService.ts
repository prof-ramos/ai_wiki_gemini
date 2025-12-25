import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: In a production environment, you should handle keys securely.
// For this frontend demo, we assume the environment variable is injected.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn('API_KEY is not set. API calls will fail.');
}
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const generateCompletion = async (
  modelName: string,
  promptText: string,
  systemInstruction?: string
): Promise<string> => {
  try {
    const modelId = modelName || 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: promptText,
      config: {
        systemInstruction: systemInstruction || "Você é um assistente jurídico experiente, preciso e formal. Responda em Português do Brasil.",
        temperature: 0.7, // Balanced for creativity and precision
      }
    });

    return response.text || "Não foi possível gerar uma resposta. Tente novamente.";
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    throw new Error(`Falha ao comunicar com a IA: ${errorMessage}. Verifique sua chave de API ou conexão.`);
  }
};