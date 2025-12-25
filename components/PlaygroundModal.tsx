import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Copy } from 'lucide-react';
import { Prompt, ToastType } from '../types';
import { generateCompletion } from '../services/geminiService';

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: Prompt | null;
  addToast: (msg: string, type?: ToastType) => void;
}

const PlaygroundModal: React.FC<PlaygroundModalProps> = ({ isOpen, onClose, prompt, addToast }) => {
  const [inputContent, setInputContent] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen && prompt) {
      // Pre-fill prompt, but let user edit placeholders
      setInputContent(prompt.content);
      setResult('');
      // Check if API key is roughly available (mock check)
      setHasApiKey(typeof process.env.API_KEY === 'string' && process.env.API_KEY.length > 0);
    }
  }, [isOpen, prompt]);

  if (!isOpen || !prompt) return null;

  const handleGenerate = async (): Promise<void> => {
    if (!inputContent.trim()) return;

    setIsLoading(true);
    try {
      // Combine title for context
      const fullContext = `Tarefa: ${prompt.title}. \n\n${inputContent}`;
      const response = await generateCompletion('gemini-3-flash-preview', fullContext);
      setResult(response);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      addToast(`Erro ao gerar resposta: ${errorMessage}. Verifique a configuração da API.`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyResult = (): void => {
    navigator.clipboard.writeText(result);
    addToast('Resultado copiado!', 'success');
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-legal-900/50 backdrop-blur-sm">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-legal-100 bg-legal-50">
          <div>
            <h2 id="modal-title" className="text-xl font-serif font-semibold text-legal-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Playground IA
            </h2>
            <p className="text-sm text-legal-700">Testando: {prompt.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-legal-500 hover:text-legal-900 hover:bg-legal-100 rounded-full transition-colors"
            aria-label="Fechar playground"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: Input */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-legal-700 mb-2">
                Edite o prompt (Preencha os [PLACEHOLDERS])
              </label>
              <textarea
                value={inputContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputContent(e.target.value)}
                className="w-full h-80 p-4 rounded-lg border border-legal-200 focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-sm resize-none bg-legal-50"
                placeholder="Edite o prompt aqui..."
              />
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !inputContent.trim()}
              className="w-full py-3 bg-accent hover:bg-accent-hover disabled:bg-legal-200 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando com Gemini...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Gerar Resultado
                </>
              )}
            </button>
            {!hasApiKey && (
               <p className="text-xs text-amber-600 mt-1">Nota: API Key necessária para funcionar.</p>
            )}
          </div>

          {/* Right: Output */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-legal-700">
                Resultado da IA
              </label>
              {result && (
                <button
                  onClick={copyResult}
                  className="p-3 text-xs flex items-center gap-1 text-accent hover:bg-accent-light rounded-lg transition-colors"
                  aria-label="Copiar resultado"
                >
                  <Copy className="w-3 h-3" /> Copiar
                </button>
              )}
            </div>
            
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-legal-50 rounded-lg border border-legal-200 p-4 overflow-auto">
                 {result ? (
                   <div className="prose prose-sm max-w-none text-legal-800 whitespace-pre-wrap">
                     {result}
                   </div>
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center text-legal-400">
                     <Sparkles className="w-10 h-10 mb-3 opacity-20" />
                     <p className="text-center text-sm">O resultado aparecerá aqui.</p>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundModal;