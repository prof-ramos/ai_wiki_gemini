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

export interface GeminiConfig {
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface AIResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
