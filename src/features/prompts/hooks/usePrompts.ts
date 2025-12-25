import { useMemo } from 'react';
import { Category, Prompt, FilterState } from '@shared/types';
import { PROMPTS } from '../data/prompts.data';

/**
 * Hook for filtering and managing prompts
 */
export const usePrompts = (filter: FilterState) => {
  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter((prompt) => {
      const matchesSearch =
        prompt.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        prompt.description.toLowerCase().includes(filter.search.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(filter.search.toLowerCase()));

      const matchesCategory = filter.category === Category.ALL || prompt.category === filter.category;

      return matchesSearch && matchesCategory;
    });
  }, [filter.search, filter.category]);

  return {
    prompts: PROMPTS,
    filteredPrompts,
    totalCount: PROMPTS.length,
    filteredCount: filteredPrompts.length,
  };
};

/**
 * Get a single prompt by ID
 */
export const usePromptById = (id: string): Prompt | undefined => {
  return useMemo(() => PROMPTS.find(p => p.id === id), [id]);
};
