# 🏗️ Arquitetura do ai.wiki.br

## Visão Geral

Este projeto segue uma **arquitetura baseada em features (feature-based architecture)**, considerada uma das melhores práticas para projetos React/TypeScript em 2025. Esta organização é ideal para plataformas educacionais com IA que precisam escalar de forma organizada.

## 📁 Estrutura de Diretórios

```
ai_wiki_gemini/
├── src/
│   ├── features/                    # ✨ Funcionalidades (Features)
│   │   ├── prompts/                # Biblioteca de prompts
│   │   │   ├── components/         # Componentes específicos
│   │   │   │   └── PromptCard.tsx
│   │   │   ├── hooks/              # Custom hooks
│   │   │   │   └── usePrompts.ts
│   │   │   ├── data/               # Dados estáticos
│   │   │   │   └── prompts.data.ts
│   │   │   └── index.ts            # 🔑 API Pública da feature
│   │   │
│   │   ├── playground/             # Playground com Gemini AI
│   │   │   ├── components/
│   │   │   │   └── PlaygroundModal.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── questions/              # Banco de questões (futuro)
│   │   ├── study-plans/            # Planos de estudo (futuro)
│   │   ├── wiki/                   # Base de conhecimento (futuro)
│   │   ├── ai-tutor/               # Chat/tutor com Gemini (futuro)
│   │   ├── flashcards/             # Sistema de flashcards (futuro)
│   │   └── progress/               # Acompanhamento de desempenho (futuro)
│   │
│   ├── shared/                      # 🔧 Código Compartilhado
│   │   ├── components/             # UI components reutilizáveis
│   │   │   ├── Toast/
│   │   │   │   ├── Toast.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Button/             # (futuro)
│   │   │   ├── Card/               # (futuro)
│   │   │   └── Layout/             # (futuro)
│   │   │
│   │   ├── hooks/                  # Custom hooks globais
│   │   │   ├── useToast.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/               # Serviços centralizados
│   │   │   └── gemini/             # 🤖 Cliente Gemini AI
│   │   │       ├── client.ts       # Cliente principal
│   │   │       ├── prompts/        # Templates de prompts
│   │   │       │   └── index.ts
│   │   │       ├── agents/         # Agentes especializados
│   │   │       │   ├── tutor-agent.ts
│   │   │       │   └── evaluator-agent.ts
│   │   │       └── index.ts
│   │   │
│   │   ├── utils/                  # Utilitários
│   │   │   ├── constants/
│   │   │   │   └── index.ts
│   │   │   ├── helpers/            # (futuro)
│   │   │   └── validators/         # (futuro)
│   │   │
│   │   └── types/                  # Types globais
│   │       └── index.ts
│   │
│   ├── config/                      # ⚙️ Configurações
│   │   └── gemini.config.ts        # Config do Gemini AI
│   │
│   ├── assets/                      # 🎨 Assets estáticos
│   │
│   └── App.tsx                      # Componente raiz
│
├── index.tsx                        # Entry point
├── tsconfig.json                    # Config TypeScript
├── vite.config.ts                   # Config Vite
└── ARCHITECTURE.md                  # Este arquivo
```

## 🎯 Princípios da Arquitetura

### 1. **Feature-Based Organization**
Cada funcionalidade é autocontida em seu próprio diretório:
- ✅ **Escalabilidade**: Features crescem independentemente
- ✅ **Manutenibilidade**: Mudanças em uma feature não afetam outras
- ✅ **Colaboração**: Times podem trabalhar em features diferentes sem conflitos
- ✅ **Remoção fácil**: Deletar uma pasta = remover a feature

### 2. **Public APIs com index.ts**
Cada feature expõe apenas o necessário através de `index.ts`:

```typescript
// ✅ BOM: Importar da API pública
import { PromptCard, usePrompts } from '@features/prompts';

// ❌ RUIM: Importar de arquivos internos
import PromptCard from '@features/prompts/components/PromptCard';
```

### 3. **Path Aliases**
Imports absolutos facilitam navegação:

```typescript
import { Toast } from '@shared/components/Toast';
import { generateCompletion } from '@shared/services/gemini';
import { GEMINI_CONFIG } from '@config/gemini.config';
import { Category, Prompt } from '@shared/types';
```

Configurado em:
- `tsconfig.json` → TypeScript
- `vite.config.ts` → Vite build

### 4. **Separação de Responsabilidades**

#### Features (src/features/)
Código **específico** de uma funcionalidade:
- Componentes da feature
- Hooks relacionados
- Dados estáticos
- Lógica de negócio específica

#### Shared (src/shared/)
Código **reutilizável** entre features:
- Componentes de UI genéricos (Button, Toast, Card)
- Hooks utilitários (useToast, useLocalStorage)
- Serviços (API, Gemini, Storage)
- Types e constantes globais

#### Config (src/config/)
**Configurações** centralizadas:
- Configuração do Gemini AI
- Rotas (futuro)
- Variáveis de ambiente

## 🤖 Arquitetura do Gemini AI

### Camada de Serviços (src/shared/services/gemini/)

#### **1. Cliente (client.ts)**
Interface principal para comunicação com Gemini:
```typescript
import { generateCompletion } from '@shared/services/gemini';

const resposta = await generateCompletion('Explique X', {
  model: 'gemini-3-flash-preview',
  systemInstruction: 'Você é um tutor...',
  temperature: 0.7,
});
```

#### **2. Agentes Especializados (agents/)**
Agentes com contextos específicos:

**TutorAgent**: Explicações e tutoria
```typescript
import { TutorAgent } from '@shared/services/gemini';

await TutorAgent.explain({
  topic: 'Direito Constitucional',
  userLevel: 'intermediário',
});
```

**EvaluatorAgent**: Correção de redações
```typescript
import { EvaluatorAgent } from '@shared/services/gemini';

await EvaluatorAgent.evaluateEssay({
  topic: 'Princípios Administrativos',
  essayText: '...',
});
```

#### **3. Templates de Prompts (prompts/)**
Prompts otimizados e reutilizáveis:
```typescript
import { PromptTemplates } from '@shared/services/gemini';

const prompt = PromptTemplates.studyPlan('Auditor Fiscal', 4, [
  'Direito Constitucional',
  'Direito Administrativo',
]);
```

## 📊 Fluxo de Dados

```
User Interaction
      ↓
  App.tsx (State Management)
      ↓
Feature Components (PromptCard, PlaygroundModal)
      ↓
Custom Hooks (usePrompts, useToast)
      ↓
Services (Gemini AI, API)
      ↓
External APIs (Google Gemini)
```

## 🔮 Features Futuras

A estrutura está preparada para expansão:

### 📚 **Wiki** (Planned)
Base de conhecimento estruturada por matéria:
- Conteúdo organizado por edital
- Sistema de busca inteligente
- Integração com IA para gerar explicações

### ❓ **Questions** (Planned)
Banco de questões com IA:
- Geração automática de questões
- Correção inteligente
- Estatísticas de desempenho

### 📅 **Study Plans** (Planned)
Cronogramas personalizados:
- Baseado em tempo disponível
- Adaptativo ao progresso
- Revisão espaçada automática

### 💬 **AI Tutor** (Planned)
Chat interativo com Gemini:
- Tire dúvidas em tempo real
- Explicações personalizadas
- Histórico de conversas

### 🃏 **Flashcards** (Planned)
Sistema de memorização:
- Geração automática de cards
- Algoritmo de repetição espaçada
- Sincronização com progresso

### 📈 **Progress** (Planned)
Dashboard de analytics:
- Métricas de estudo
- Pontos fracos identificados
- Sugestões de melhoria

## 🛠️ Como Adicionar uma Nova Feature

1. **Crie a estrutura**:
```bash
mkdir -p src/features/nova-feature/{components,hooks,services}
```

2. **Desenvolva a feature**:
```
src/features/nova-feature/
├── components/
│   └── NovoComponente.tsx
├── hooks/
│   └── useNovaFeature.ts
├── services/
│   └── novaFeature.service.ts
└── index.ts  # API pública
```

3. **Exponha a API pública** (`index.ts`):
```typescript
export { NovoComponente } from './components/NovoComponente';
export { useNovaFeature } from './hooks/useNovaFeature';
```

4. **Use na aplicação**:
```typescript
import { NovoComponente, useNovaFeature } from '@features/nova-feature';
```

## 📚 Referências

Esta arquitetura é baseada em:
- [React Folder Structure 2025](https://www.robinwieruch.de/react-folder-structure/)
- [Building Professional React Projects](https://www.netguru.com/blog/react-project-structure)
- [AI-Powered Learning Platforms](https://www.kovench.com/blog/inside-the-ai-architecture-of-modern-learning-systems)

## 🎓 Benefícios para Plataformas Educacionais

1. **Modularidade**: Cada recurso educacional é independente
2. **Escalabilidade**: Adicione features sem refatorar código existente
3. **IA Organizada**: Serviços de IA centralizados e reutilizáveis
4. **Manutenibilidade**: Fácil localizar e modificar código
5. **Onboarding**: Novos desenvolvedores entendem a estrutura rapidamente

---

**Desenvolvido por**: Prof. Gabriel Ramos
**Projeto**: ai.wiki.br - IA para Concursos Públicos
**Última atualização**: 2025-12-25
