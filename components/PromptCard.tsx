import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Bookmark } from 'lucide-react';
import { Prompt, Category } from '../types';
import { CATEGORY_ICONS } from '../constants';

interface PromptCardProps {
  prompt: Prompt;
  onCopy: (content: string) => void;
  onOpenPlayground: (prompt: Prompt) => void;
  viewMode?: 'grid' | 'list';
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onCopy, onOpenPlayground, viewMode = 'grid' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const isList = viewMode === 'list';

  const handleCopy = () => {
    onCopy(prompt.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getComplexityColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-blue-100 text-blue-800';
      case 'Avançado': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <article
      className={`group relative bg-white rounded-xl border border-legal-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col ${
        isList ? 'h-auto' : 'h-full'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header Image / Icon Area */}
      <div className={`${isList ? 'px-4 pt-3 pb-0 flex-row-reverse justify-end gap-3' : 'px-6 pt-6 justify-between'} flex items-start`}>
        <div className="flex gap-2">
           <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full transition-colors ${isSaved ? 'text-accent bg-accent-light' : 'text-legal-300 hover:bg-legal-50'}`}
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
      <div className={`${isList ? 'px-4 py-2' : 'px-6 py-4'} flex-1`}>
        <div className="flex items-center gap-2 mb-2">
          {prompt.isNew && (
            <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-accent rounded-full uppercase tracking-wider">
              Novo
            </span>
          )}
          <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full uppercase tracking-wide ${getComplexityColor(prompt.complexity)}`}>
            {prompt.complexity}
          </span>
        </div>
        
        {/* Title: Adjusted leading for better mobile readability in list mode */}
        <h3 className={`font-serif font-bold text-legal-900 mb-2 group-hover:text-accent transition-colors ${
          isList ? 'text-base leading-snug' : 'text-lg leading-tight'
        }`}>
          {prompt.title}
        </h3>
        
        {/* Description: Increased spacing and line-height for list view */}
        <p className={`text-legal-700 text-sm ${
          isList ? 'line-clamp-none leading-relaxed mb-4' : 'line-clamp-3 mb-3'
        }`}>
          {prompt.description}
        </p>

        <div className={`flex flex-wrap gap-1.5 ${isList ? 'mt-2' : 'mt-auto'}`}>
          {prompt.tags.map(tag => (
            <span key={tag} className="text-xs text-legal-500 bg-legal-50 px-2 py-0.5 rounded border border-legal-100">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className={`${isList ? 'px-4 pb-3 pt-2' : 'px-6 pb-6 pt-2'} flex items-center justify-between border-t border-transparent group-hover:border-legal-50 mt-2`}>
        <button
          onClick={() => onOpenPlayground(prompt)}
          className="text-sm font-medium text-legal-500 hover:text-accent flex items-center gap-1 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Testar
        </button>

        <button
          onClick={handleCopy}
          disabled={isCopied}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isCopied 
              ? 'bg-green-600 text-white' 
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
};

export default PromptCard;