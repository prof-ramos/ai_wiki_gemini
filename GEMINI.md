# AI Wiki - IA para Concursos Públicos

## Visão Geral do Projeto
Este projeto é uma aplicação web React desenvolvida com Vite e TypeScript, projetada para auxiliar estudantes em concursos públicos utilizando inteligência artificial. A aplicação integra a API do Google Gemini (`@google/genai`) para fornecer assistência inteligente, respondendo a dúvidas e gerando conteúdo de estudo.

## Stack Tecnológico
- **Frontend Framework:** React 19
- **Build Tool:** Vite 6
- **Linguagem:** TypeScript
- **Estilização:** CSS (inferred) / Lucide React (Ícones)
- **AI Integration:** Google GenAI SDK (`@google/genai`)

## Estrutura de Diretórios
- `/`: Arquivos de configuração e entry points (`App.tsx`, `index.tsx`).
- `/components`: Componentes React reutilizáveis (Cards, Modais, Ícones).
- `/services`: Lógica de integração com serviços externos (`geminiService.ts`).
- `/dist`: Build de produção (gerado).

## Configuração e Execução

### Pré-requisitos
- Node.js instalado.
- Uma chave de API do Google Gemini.

### Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com a seguinte chave:
```env
GEMINI_API_KEY=sua_chave_aqui
```
*Nota: O `vite.config.ts` mapeia esta variável para `process.env.API_KEY` e `process.env.GEMINI_API_KEY` para uso no código.*

### Comandos Principais
| Comando | Descrição |
| :--- | :--- |
| `npm install` | Instala as dependências do projeto. |
| `npm run dev` | Inicia o servidor de desenvolvimento local (porta 3000). |
| `npm run build` | Gera o build de produção na pasta `dist`. |
| `npm run preview` | Visualiza o build de produção localmente. |

## Arquitetura e Padrões

### Integração com IA (`services/geminiService.ts`)
- Utiliza o SDK `@google/genai`.
- A função `generateCompletion` abstrai as chamadas à API.
- **Modelo Padrão:** `gemini-3-flash-preview` (pode ser configurado).
- **Instrução de Sistema Padrão:** "Você é um assistente jurídico experiente, preciso e formal. Responda em Português do Brasil."

### Convenções de Código
- **Componentes:** Componentes funcionais React.
- **TypeScript:** Configurado com `strict` checks moderados (`skipLibCheck: true`, `noEmit: true`).
- **Imports:** Alias `@/` configurado para a raiz do projeto.
- **Tratamento de Erros:** O serviço de IA possui tratamento básico de erros, retornando mensagens amigáveis em caso de falha na API.

## Notas Adicionais
- O projeto parece ser uma SPA (Single Page Application) simples.
- A configuração do Vite expõe as variáveis de ambiente via `define`, o que não é o padrão típico do Vite (`import.meta.env`), mas garante compatibilidade com códigos que esperam `process.env`.
