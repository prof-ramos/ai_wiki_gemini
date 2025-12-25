/**
 * Specialized Prompt Templates
 * Optimized prompts for different use cases
 */

export const PromptTemplates = {
  /**
   * Generate an explanation for a legal concept
   */
  explanation: (topic: string, level: 'iniciante' | 'intermediário' | 'avançado') => `
Explique o seguinte conceito jurídico de forma ${level}:

Tópico: ${topic}

Estruture sua resposta em:
1. Definição clara
2. Base legal (artigos/leis relevantes)
3. Exemplo prático
4. Pegadinhas comuns em provas (se aplicável)
  `.trim(),

  /**
   * Generate practice questions
   */
  questionGeneration: (subject: string, questionType: 'múltipla escolha' | 'certo/errado', count: number) => `
Crie ${count} questões de ${questionType} sobre ${subject}.

Para cada questão, forneça:
- Enunciado claro
- Alternativas (se múltipla escolha)
- Gabarito comentado
- Fonte/fundamento legal

Estilo de banca: Cebraspe/CESPE (rigor técnico)
  `.trim(),

  /**
   * Review and correct essays
   */
  essayReview: (topic: string, essayText: string) => `
Corrija a seguinte redação dissertativa sobre "${topic}" usando os critérios da banca Cebraspe:

${essayText}

Avalie em escala 0-10:
1. Apresentação e estrutura textual
2. Desenvolvimento do tema
3. Domínio da norma culta

Forneça feedback detalhado e sugestões de melhoria.
  `.trim(),

  /**
   * Generate study plan
   */
  studyPlan: (position: string, hoursPerDay: number, subjects: string[]) => `
Crie um cronograma de estudos semanal para o cargo de ${position}.

Horas disponíveis por dia: ${hoursPerDay}
Matérias do edital: ${subjects.join(', ')}

Requisitos:
- Priorize matérias por peso/relevância
- Inclua revisões espaçadas
- Reserve tempo para questões
- Formato: Tabela semanal
  `.trim(),
};

export default PromptTemplates;
