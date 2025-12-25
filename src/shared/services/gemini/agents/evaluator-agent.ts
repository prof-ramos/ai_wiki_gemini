import { generateCompletion } from '../client';
import { GEMINI_CONFIG } from '@config/gemini.config';

/**
 * Evaluator Agent
 * Specialized in grading essays and providing feedback
 */

export interface EssayEvaluationRequest {
  topic: string;
  essayText: string;
  rubric?: string[];
}

export class EvaluatorAgent {
  /**
   * Evaluate an essay/dissertation
   */
  static async evaluateEssay(request: EssayEvaluationRequest): Promise<string> {
    const { topic, essayText, rubric } = request;

    const defaultRubric = [
      'Apresentação e estrutura textual (0-10)',
      'Desenvolvimento do tema (0-10)',
      'Domínio da norma culta (0-10)',
    ];

    const criteriaList = rubric || defaultRubric;

    const prompt = `
Aja como um examinador da banca Cebraspe. Corrija a dissertação abaixo:

Tema: ${topic}

Texto:
${essayText}

Critérios de avaliação:
${criteriaList.map((c, i) => `${i + 1}. ${c}`).join('\n')}

Forneça:
- Nota para cada critério
- Justificativa dos erros
- Sugestões específicas de melhoria
    `.trim();

    return generateCompletion(prompt, {
      model: GEMINI_CONFIG.models.pro,
      systemInstruction: GEMINI_CONFIG.systemInstructions.examPrep,
      temperature: 0.5, // Lower temperature for more consistent grading
    });
  }

  /**
   * Review legal document
   */
  static async reviewLegalDocument(documentText: string, documentType: string): Promise<string> {
    const prompt = `
Revise o seguinte documento jurídico (${documentType}):

${documentText}

Identifique:
- Erros técnicos ou conceituais
- Problemas de formatação
- Melhorias sugeridas
- Pontos fortes
    `.trim();

    return generateCompletion(prompt, {
      model: GEMINI_CONFIG.models.pro,
      systemInstruction: GEMINI_CONFIG.systemInstructions.legal,
      temperature: 0.3,
    });
  }
}
