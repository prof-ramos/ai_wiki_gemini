// ============================================
// Global Types for ai.wiki.br
// ============================================

export enum Category {
  ALL = 'Todos',
  EXAM_PREP = 'Concursos Públicos',
  LEGAL_DRAFTING = 'Redação Jurídica',
  ANALYSIS = 'Análise de Documentos',
  ADMINISTRATIVE = 'Administrativo',
  CLIENT_COMMS = 'Atendimento ao Cliente'
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string; // The actual prompt text
  category: Category;
  tags: string[];
  complexity: 'Iniciante' | 'Intermediário' | 'Avançado';
  isNew?: boolean;
}

export interface FilterState {
  search: string;
  category: Category;
  viewMode: 'grid' | 'list';
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

// ============================================
// AI/Gemini Types
// ============================================

/**
 * AI Response from Gemini API
 * @property content - The generated text response
 * @property model - The model ID that generated the response
 * @property usage - Token usage statistics (may be undefined if not provided by the SDK)
 */
export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
