import { generateCompletion } from '../client';
import { GEMINI_CONFIG } from '@config/gemini.config';

/**
 * AI Tutor Agent
 * Specialized agent for personalized tutoring and explanations
 */

export interface TutorRequest {
  topic: string;
  userLevel?: 'iniciante' | 'intermediário' | 'avançado';
  context?: string;
}

export class TutorAgent {
  /**
   * Explain a concept to the user
   */
  static async explain(request: TutorRequest): Promise<string> {
    const { topic, userLevel = 'intermediário', context } = request;

    const prompt = `
Como um tutor especializado em concursos públicos, explique:

Tópico: ${topic}
Nível do aluno: ${userLevel}
${context ? `Contexto adicional: ${context}` : ''}

Forneça uma explicação didática, clara e com exemplos práticos.
    `.trim();

    return generateCompletion(prompt, {
      model: GEMINI_CONFIG.models.flash,
      systemInstruction: GEMINI_CONFIG.systemInstructions.examPrep,
    });
  }

  /**
   * Answer a specific question
   */
  static async answerQuestion(question: string): Promise<string> {
    const prompt = `
Responda à seguinte dúvida de forma clara e fundamentada:

${question}

Inclua:
- Resposta direta
- Fundamento legal (se aplicável)
- Exemplo prático
    `.trim();

    return generateCompletion(prompt, {
      model: GEMINI_CONFIG.models.flash,
      systemInstruction: GEMINI_CONFIG.systemInstructions.examPrep,
    });
  }
}
