/**
 * CardTest.tsx - Componente de teste para validar correções do CodeRabbit
 *
 * Testa:
 * 1. União discriminada (ariaLabel obrigatório em cards clicáveis)
 * 2. Padding otimizado em header/footer
 * 3. Elemento HTML correto (<button> vs <article>)
 * 4. Navegação por teclado
 */

import React from 'react';
import Card from './Card';

const CardTest: React.FC = () => {
  const handleClick = (cardName: string) => {
    console.log(`Card clicado: ${cardName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-50 to-accent/5 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Título */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-legal-800">
            🧪 Teste de Correções - CodeRabbit
          </h1>
          <p className="text-legal-600">
            Validando união discriminada, padding otimizado e semântica HTML
          </p>
        </div>

        {/* Seção 1: Type Safety - União Discriminada */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-legal-700 border-b-2 border-accent pb-2">
            ✅ Type Safety - União Discriminada
          </h2>
          <p className="text-legal-600">
            Cards clicáveis <strong>EXIGEM</strong> ariaLabel (TypeScript impede compilação sem ele)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card clicável COM ariaLabel (correto) ✅ */}
            <Card
              variant="interactive"
              onClick={() => handleClick('Card Clicável Correto')}
              ariaLabel="Card interativo de exemplo - clique para testar"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-legal-800">
                  ✅ Card Clicável (com ariaLabel)
                </h3>
                <p className="text-legal-600">
                  Este card tem onClick + ariaLabel. TypeScript está feliz! 🎉
                </p>
                <code className="block text-xs bg-legal-100 p-2 rounded">
                  onClick + ariaLabel="..." ✅
                </code>
              </div>
            </Card>

            {/* Card NÃO-clicável sem ariaLabel (opcional) ✅ */}
            <Card variant="outlined">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-legal-800">
                  ✅ Card Não-Clicável (sem ariaLabel)
                </h3>
                <p className="text-legal-600">
                  Este card não tem onClick. ariaLabel é opcional. TypeScript está feliz! 🎉
                </p>
                <code className="block text-xs bg-legal-100 p-2 rounded">
                  sem onClick, ariaLabel opcional ✅
                </code>
              </div>
            </Card>
          </div>

          {/* Exemplo que causaria erro de compilação */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">
              ❌ Este código NÃO compila (TypeScript Error):
            </h4>
            <pre className="text-xs text-red-700 bg-red-100 p-3 rounded overflow-x-auto">
{`<Card onClick={() => alert('click')}>
  Conteúdo
</Card>
// ❌ Error: Property 'ariaLabel' is missing`}</pre>
          </div>
        </section>

        {/* Seção 2: Padding Otimizado */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-legal-700 border-b-2 border-accent pb-2">
            📏 Padding Otimizado - Header/Footer
          </h2>
          <p className="text-legal-600">
            Header/footer agora usam padding vertical reduzido (py-2/3/4 vs p-4/6/8)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Padding Small */}
            <Card
              variant="default"
              padding="sm"
              header={
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-legal-800">Header Small</h3>
                  <span className="text-xs text-legal-500">py-2</span>
                </div>
              }
              footer={
                <div className="flex justify-between items-center">
                  <span className="text-xs text-legal-500">py-2</span>
                  <button className="text-accent hover:underline text-sm">Ação</button>
                </div>
              }
            >
              <p className="text-legal-600">
                Body com padding completo (p-4). Header/footer com py-2.
              </p>
            </Card>

            {/* Padding Medium (padrão) */}
            <Card
              variant="elevated"
              padding="md"
              header={
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-legal-800">Header Medium</h3>
                  <span className="text-xs text-legal-500">py-3</span>
                </div>
              }
              footer={
                <div className="flex justify-between items-center">
                  <span className="text-xs text-legal-500">py-3</span>
                  <button className="text-accent hover:underline text-sm">Ação</button>
                </div>
              }
            >
              <p className="text-legal-600">
                Body com padding completo (p-6). Header/footer com py-3.
              </p>
            </Card>

            {/* Padding Large */}
            <Card
              variant="outlined"
              padding="lg"
              header={
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-legal-800">Header Large</h3>
                  <span className="text-xs text-legal-500">py-4</span>
                </div>
              }
              footer={
                <div className="flex justify-between items-center">
                  <span className="text-xs text-legal-500">py-4</span>
                  <button className="text-accent hover:underline text-sm">Ação</button>
                </div>
              }
            >
              <p className="text-legal-600">
                Body com padding completo (p-8). Header/footer com py-4.
              </p>
            </Card>
          </div>
        </section>

        {/* Seção 3: Elemento HTML Correto */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-legal-700 border-b-2 border-accent pb-2">
            🏷️ Semântica HTML - &lt;button&gt; vs &lt;article&gt;
          </h2>
          <p className="text-legal-600">
            Inspecione o HTML (F12): cards clicáveis usam <code>&lt;button&gt;</code>, não-clicáveis usam <code>&lt;article&gt;</code>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card com <button> */}
            <Card
              variant="interactive"
              onClick={() => handleClick('Botão Nativo')}
              ariaLabel="Card renderizado como button HTML"
              className="border-2 border-green-300"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-green-800">
                  🟢 Renderiza como &lt;button&gt;
                </h3>
                <p className="text-legal-600">
                  Inspecione este card no DevTools. O elemento raiz é um <code className="bg-green-100 px-1">&lt;button type="button"&gt;</code>
                </p>
                <ul className="text-sm text-legal-600 space-y-1">
                  <li>✅ Focável por Tab</li>
                  <li>✅ Enter/Space ativa onClick</li>
                  <li>✅ Semântica correta</li>
                </ul>
              </div>
            </Card>

            {/* Card com <article> */}
            <Card
              variant="outlined"
              className="border-2 border-blue-300"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-800">
                  🔵 Renderiza como &lt;article&gt;
                </h3>
                <p className="text-legal-600">
                  Inspecione este card no DevTools. O elemento raiz é um <code className="bg-blue-100 px-1">&lt;article&gt;</code>
                </p>
                <ul className="text-sm text-legal-600 space-y-1">
                  <li>✅ Não focável (não interativo)</li>
                  <li>✅ Semântica de conteúdo</li>
                  <li>✅ Acessível como artigo</li>
                </ul>
              </div>
            </Card>
          </div>
        </section>

        {/* Seção 4: Navegação por Teclado */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-legal-700 border-b-2 border-accent pb-2">
            ⌨️ Navegação por Teclado
          </h2>
          <p className="text-legal-600">
            Teste com Tab, Enter e Space. Buttons nativos eliminam necessidade de handlers customizados.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <Card
                key={num}
                variant="interactive"
                onClick={() => handleClick(`Card ${num}`)}
                ariaLabel={`Card de teste de teclado número ${num}`}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-accent">{num}</div>
                  <p className="text-sm text-legal-600">
                    Tab → Enter/Space
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Seção 5: Todas as Variantes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-legal-700 border-b-2 border-accent pb-2">
            🎨 Todas as Variantes Visuais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {(['default', 'outlined', 'elevated', 'flat', 'interactive'] as const).map((variant) => (
              <Card
                key={variant}
                variant={variant}
                onClick={() => handleClick(variant)}
                ariaLabel={`Card variante ${variant}`}
              >
                <div className="text-center space-y-2">
                  <h4 className="font-semibold text-legal-800 capitalize">{variant}</h4>
                  <p className="text-xs text-legal-500">Clique-me!</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Rodapé com instruções */}
        <footer className="bg-legal-100 rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-legal-800">📋 Checklist de Testes:</h3>
          <ul className="space-y-2 text-legal-600">
            <li>✅ Cards clicáveis exigem ariaLabel (TypeScript valida)</li>
            <li>✅ Padding reduzido em header/footer (compare visualmente)</li>
            <li>✅ Cards clicáveis renderizam como <code>&lt;button&gt;</code></li>
            <li>✅ Cards não-clicáveis renderizam como <code>&lt;article&gt;</code></li>
            <li>✅ Navegação por teclado funciona (Tab, Enter, Space)</li>
            <li>✅ Build TypeScript passa sem erros</li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default CardTest;
