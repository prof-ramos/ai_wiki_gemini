import React, { useState, useMemo } from 'react';
import { Search, LayoutGrid, List as ListIcon, Menu, X, Github, Linkedin, Mail, Sparkles, TestTube2 } from 'lucide-react';
import { PROMPTS, CATEGORY_ICONS } from './constants';
import { Category, FilterState, Prompt, ToastMessage, ToastType } from './types';
import PromptCard from './components/PromptCard';
import Toast from './components/Toast';
import PlaygroundModal from './components/PlaygroundModal';
import CardTest from './components/CardTest';
import Logo from './components/Logo';

function App() {
  // State
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    category: Category.ALL,
    viewMode: 'grid',
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [showCardTest, setShowCardTest] = useState(false);

  // Toast Handler
  const addToast = (message: string, type: ToastType = 'success'): void => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Logic: Filtering
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

  const categories = Object.values(Category);

  // Handlers
  const handleCopy = (content: string): void => {
    navigator.clipboard.writeText(content);
    addToast('Prompt copiado para a área de transferência!');
  };

  const handleOpenPlayground = (prompt: Prompt): void => {
    setSelectedPrompt(prompt);
    setPlaygroundOpen(true);
  };

  // Renderizar página de testes se ativado
  if (showCardTest) {
    return (
      <div className="min-h-screen flex flex-col font-sans text-legal-900 bg-legal-50">
        {/* Header simplificado */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-legal-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Logo />
              <button
                onClick={() => setShowCardTest(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-legal-900 text-white hover:bg-legal-800 transition-colors"
              >
                <X className="w-4 h-4" />
                Voltar
              </button>
            </div>
          </div>
        </header>

        <CardTest />

        <Toast toasts={toasts} removeToast={removeToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-legal-900 bg-legal-50">

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-legal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-legal-600">
              <a href="#library" className="text-legal-900">Biblioteca</a>
              <a href="#about" className="hover:text-accent transition-colors">Sobre</a>
              <button
                onClick={() => setShowCardTest(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors text-green-800 font-semibold"
              >
                <TestTube2 className="w-4 h-4" />
                Card Tests
              </button>
              <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-legal-100 hover:bg-legal-200 transition-colors">
                API Docs
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-legal-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-legal-100 bg-white px-4 py-4 space-y-4">
            <a href="#library" className="block py-2 font-medium">Biblioteca</a>
            <a href="#about" className="block py-2 font-medium">Sobre</a>
            <button
              onClick={() => { setShowCardTest(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 font-medium text-green-800 w-full"
            >
              <TestTube2 className="w-4 h-4" />
              Card Tests
            </button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="bg-legal-900 text-white pt-16 pb-20 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-legal-800 border border-legal-700 mb-6">
            <Sparkles className="w-4 h-4 text-accent-light" />
            <span className="text-xs font-bold tracking-wider uppercase text-accent-light">
              Foco em Concursos Públicos
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
            Sua Aprovação Acelerada <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-light to-white">
              pela Inteligência Artificial
            </span>
          </h1>
          <p className="text-lg md:text-xl text-legal-300 max-w-2xl mx-auto mb-10 font-light">
            A maior biblioteca de prompts para concurseiros: crie cronogramas, corrija discursivas e gere simulados em segundos. Ferramentas essenciais também para a prática jurídica.
          </p>
          
          {/* Search Bar - Hero */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-gold rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative flex items-center bg-white rounded-xl shadow-2xl p-2">
              <Search className="w-6 h-6 text-legal-400 ml-3" />
              <input
                type="text"
                placeholder="Busque por 'Discursiva', 'Cronograma', 'Direito Constitucional'..."
                className="w-full px-4 py-3 text-legal-900 placeholder-legal-400 bg-transparent border-none focus:ring-0 text-lg outline-none"
                value={filter.search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                aria-label="Buscar prompts"
              />
              <button className="hidden sm:block bg-legal-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-accent transition-colors">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main id="library" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(prev => ({ ...prev, category: cat }))}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter.category === cat
                    ? 'bg-legal-900 text-white shadow-md'
                    : 'bg-white text-legal-600 border border-legal-200 hover:border-legal-400 hover:bg-legal-50'
                }`}
              >
                {CATEGORY_ICONS[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex bg-white border border-legal-200 rounded-lg p-1 ml-auto md:ml-0 mt-4 md:mt-0">
            <button
              onClick={() => setFilter(prev => ({ ...prev, viewMode: 'grid' }))}
              className={`p-3 rounded ${filter.viewMode === 'grid' ? 'bg-legal-100 text-legal-900' : 'text-legal-400 hover:text-legal-600'}`}
              aria-label="Visualização em Grade"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setFilter(prev => ({ ...prev, viewMode: 'list' }))}
              className={`p-3 rounded ${filter.viewMode === 'list' ? 'bg-legal-100 text-legal-900' : 'text-legal-400 hover:text-legal-600'}`}
              aria-label="Visualização em Lista"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold text-legal-800">
            {filter.category === Category.ALL ? 'Prompts em Destaque' : filter.category}
          </h2>
          <span className="text-sm text-legal-500 font-medium">
            {filteredPrompts.length} resultados encontrados
          </span>
        </div>

        {/* Grid/List Display */}
        {filteredPrompts.length > 0 ? (
          <div className={`grid ${filter.viewMode === 'list' ? 'gap-4' : 'gap-6'} ${
            filter.viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredPrompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onCopy={handleCopy}
                onOpenPlayground={handleOpenPlayground}
                viewMode={filter.viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-legal-300">
            <Search className="w-12 h-12 text-legal-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-legal-900">Nenhum prompt encontrado</h3>
            <p className="text-legal-500">Tente ajustar seus filtros ou termos de busca.</p>
            <button 
              onClick={() => setFilter({ search: '', category: Category.ALL, viewMode: 'grid' })}
              className="mt-4 text-accent hover:underline font-medium"
            >
              Limpar filtros
            </button>
          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer id="about" className="bg-white border-t border-legal-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-legal-900 rounded flex items-center justify-center text-white font-serif font-bold text-xs">
                  AI
                </div>
                <span className="font-serif text-lg font-bold">ai.wiki.br</span>
              </div>
              <p className="text-legal-500 text-sm leading-relaxed">
                Projeto educacional desenvolvido pelo Prof. Gabriel Ramos. Focado em preparar candidatos para concursos públicos e equipar profissionais do direito com as melhores ferramentas de IA.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-legal-900 mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-sm text-legal-600">
                <li><a href="#" className="hover:text-accent">Biblioteca</a></li>
                <li><a href="#" className="hover:text-accent">Sugerir um Prompt</a></li>
                <li><a href="#" className="hover:text-accent">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-accent">Política de Privacidade</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-legal-900 mb-4">Contato</h4>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-legal-100 rounded-full hover:bg-legal-200 transition-colors text-legal-700" aria-label="GitHub">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-legal-100 rounded-full hover:bg-legal-200 transition-colors text-legal-700" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="p-3 bg-legal-100 rounded-full hover:bg-legal-200 transition-colors text-legal-700" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              <p className="mt-4 text-xs text-legal-400">
                Este site é apenas para fins educacionais. Verifique sempre as respostas da IA.
              </p>
            </div>
          </div>
          
          <div className="border-t border-legal-100 pt-8 text-center text-sm text-legal-400">
            &copy; {new Date().getFullYear()} ai.wiki.br. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Global Components */}
      <Toast toasts={toasts} removeToast={removeToast} />
      
      <PlaygroundModal 
        isOpen={playgroundOpen} 
        onClose={() => setPlaygroundOpen(false)} 
        prompt={selectedPrompt}
        addToast={addToast}
      />
    </div>
  );
}

export default App;