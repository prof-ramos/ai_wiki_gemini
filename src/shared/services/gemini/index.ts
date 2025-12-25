/**
 * Gemini AI Service - Public API
 * Exports all Gemini-related functionality
 */

// Client
export { generateCompletion, generateCompletionWithMetadata, isApiKeyConfigured } from './client';

// Agents
export { TutorAgent } from './agents/tutor-agent';
export { EvaluatorAgent } from './agents/evaluator-agent';

// Prompts
export { PromptTemplates } from './prompts';

// Types
export type { TutorRequest } from './agents/tutor-agent';
export type { EssayEvaluationRequest, EvaluationResult } from './agents/evaluator-agent';
