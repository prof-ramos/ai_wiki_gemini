import React, { useState, memo } from 'react';
import { Copy, Check, ExternalLink, Bookmark } from 'lucide-react';
import GeminiIcon from './icons/GeminiIcon';
import ChatGPTIcon from './icons/ChatGPTIcon';
import { Prompt, Category } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface PromptCardProps {
  prompt: Prompt;
  onCopy: (content: string) => void;
  onOpenPlayground: (prompt: Prompt) => void;
  viewMode?: 'grid' | 'list';
}

const PromptCard: React.FC<PromptCardProps> = memo(({ prompt, onCopy, onOpenPlayground, viewMode = 'grid' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const isList = viewMode === 'list';

  const handleCopy = (): void => {
    onCopy(prompt.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleChatGPTTest = async (e: React.MouseEvent): Promise<void> => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(prompt.content);
      onCopy(prompt.content);
    } catch (error) {
      console.error('Erro ao copiar prompt:', error);
      onCopy(prompt.content);
    }

    const encodedPrompt = encodeURIComponent(prompt.content);
    const chatGPTUrl = `https://chatgpt.com/?q=${encodedPrompt}`;
    const newWindow = window.open(chatGPTUrl, '_blank', 'noopener,noreferrer');

    if (!newWindow) {
      console.warn('Popup blocker detected');
      alert('Popup bloqueado! Por favor, permita popups para este site ou clique novamente.');
    }
  };

  const getComplexityColor = (level: Prompt['complexity']): string => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-blue-100 text-blue-800';
      case 'Avançado': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <article
      className={`group relative bg-white rounded-xl border border-legal-100 flex flex-col 
      ${isList ? 'h-auto mb-6' : 'h-full'}
      /* Animation & Visual States */
      shadow-sm hover:shadow-lg hover:border-accent
      transition-all duration-300 ease-in-out transform-gpu
      motion-safe:hover:scale-105 hover:z-10
      active:scale-[0.98]
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Image / Icon Area */}
      <div className={`${isList ? 'px-6 pt-6 pb-0 flex-row-reverse justify-end gap-4' : 'px-6 pt-6 justify-between'} flex items-start`}>
        <div className="flex gap-2">
           <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className={`p-3 rounded-full transition-colors ${isSaved ? 'text-accent bg-accent-light' : 'text-legal-300 hover:bg-legal-50'}`}
            aria-label={isSaved ? "Remover dos favoritos" : "Salvar nos favoritos"}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className={`p-2 rounded-lg ${prompt.category === Category.EXAM_PREP ? 'bg-purple-100 text-purple-700' : 'bg-legal-100 text-legal-700'}`}>
          {CATEGORY_ICONS[prompt.category]}
        </div>
      </div>

      {/* Content */}
      <div className={`${isList ? 'px-6 py-5' : 'px-6 py-4'} flex-1`}>
        <div className="flex items-center gap-2 mb-4">
          {prompt.isNew && (
            <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-accent rounded-full uppercase tracking-wider">
              Novo
            </span>
          )}
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full uppercase tracking-wide ${getComplexityColor(prompt.complexity)}`}>
            {prompt.complexity}
          </span>
        </div>
        
        {/* Title: Adjusted typography for list mode */}
        <h3 className={`font-serif font-bold text-legal-900 group-hover:text-accent transition-colors ${
          isList ? 'text-xl md:text-2xl leading-snug mb-3' : 'text-lg leading-tight mb-2'
        }`}>
          {prompt.title}
        </h3>
        
        {/* Description: Increased font size and line-height for list mode */}
        <p className={`text-legal-700 ${
          isList ? 'text-base leading-relaxed mb-5' : 'text-sm line-clamp-3 mb-3'
        }`}>
          {prompt.description}
        </p>

        <div className={`flex flex-wrap gap-2 ${isList ? 'mt-4' : 'mt-auto'}`}>
          {prompt.tags.map(tag => (
            <span key={tag} className="text-xs text-legal-500 bg-legal-50 px-2.5 py-1 rounded border border-legal-100">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className={`${isList ? 'px-6 pb-6 pt-2' : 'px-6 pb-6 pt-2'} flex items-center justify-between border-t border-transparent group-hover:border-legal-50 mt-2`}>
        
        {/* Test Actions with Multi-Model Options */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-legal-400 uppercase tracking-wider">
            Testar
          </span>

          {/* Botão Gemini (in-app) */}
          <div className="relative group/gemini">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPlayground(prompt);
              }}
              className="p-3 rounded-lg bg-legal-100 hover:bg-blue-50 transition-all duration-200 active:scale-95"
              aria-label="Testar no Gemini"
            >
              <GeminiIcon className="w-4 h-4 text-legal-600 group-hover/gemini:text-blue-600" />
            </button>

            {/* Tooltip Gemini */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-legal-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover/gemini:opacity-100 transition-all duration-200 pointer-events-none z-20 whitespace-nowrap">
              Testar no Gemini (in-app)
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-legal-900"></div>
            </div>
          </div>

          {/* Botão ChatGPT (external) */}
          <div className="relative group/chatgpt">
            <button
              onClick={handleChatGPTTest}
              className="p-3 rounded-lg bg-legal-100 hover:bg-emerald-50 transition-all duration-200 active:scale-95"
              aria-label="Testar no ChatGPT"
            >
              <ChatGPTIcon className="w-4 h-4 text-legal-600 group-hover/chatgpt:text-emerald-600" />
            </button>

            {/* Tooltip ChatGPT */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-legal-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover/chatgpt:opacity-100 transition-all duration-200 pointer-events-none z-20 whitespace-nowrap">
              Testar no ChatGPT (nova aba)
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-legal-900"></div>
            </div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent card click if we ever make the whole card clickable
            handleCopy();
          }}
          disabled={isCopied}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 transform ${
            isCopied 
              ? 'bg-green-600 text-white shadow-md scale-105 ring-2 ring-green-200 ring-offset-1' 
              : 'bg-legal-900 text-white hover:bg-accent'
          }`}
          aria-label={isCopied ? "Copiado com sucesso" : "Copiar prompt"}
        >
          {isCopied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copiado</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className={isList ? 'hidden sm:inline' : ''}>Copiar</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
});

export default PromptCard;