import { Category, Prompt } from './types';
import { Scale, BookOpen, Briefcase, FileText, MessageSquare, ShieldCheck, GraduationCap } from 'lucide-react';
import React from 'react';

// Mapping categories to Icons
export const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  [Category.ALL]: <Scale className="w-4 h-4" />,
  [Category.EXAM_PREP]: <GraduationCap className="w-4 h-4" />,
  [Category.LEGAL_DRAFTING]: <FileText className="w-4 h-4" />,
  [Category.ADMINISTRATIVE]: <Briefcase className="w-4 h-4" />,
  [Category.CLIENT_COMMS]: <MessageSquare className="w-4 h-4" />,
  [Category.ANALYSIS]: <ShieldCheck className="w-4 h-4" />,
};

export const PROMPTS: Prompt[] = [
  {
    id: '101',
    title: 'Cronograma de Estudos Inteligente',
    description: 'Crie um plano de estudos personalizado baseado no edital e nas suas horas disponíveis.',
    content: "Atue como um mentor especialista em concursos públicos. Crie um cronograma de estudos semanal para o cargo de [CARGO] do órgão [ÓRGÃO]. Tenho [NÚMERO] horas líquidas disponíveis por dia. Distribua as matérias do edital priorizando as de maior peso. Inclua momentos de revisão ativa e resolução de questões. Formato: Tabela.",
    category: Category.EXAM_PREP,
    tags: ['Produtividade', 'Planejamento', 'Edital'],
    complexity: 'Intermediário',
    isNew: true,
  },
  {
    id: '102',
    title: 'Correção de Discursiva (Banca Cebraspe)',
    description: 'Simule a correção de uma redação jurídica com os critérios rigorosos da banca.',
    content: "Aja como um examinador da banca Cebraspe. Corrija a dissertação abaixo sobre o tema '[TEMA]'. Avalie os seguintes quesitos: 1) Apresentação e estrutura textual, 2) Desenvolvimento do tema, 3) Domínio da modalidade escrita (gramática). Atribua uma nota de 0 a 10 para cada quesito e justifique os erros encontrados, sugerindo melhorias. Texto: [COLAR REDAÇÃO]",
    category: Category.EXAM_PREP,
    tags: ['Discursiva', 'Redação', 'Cebraspe'],
    complexity: 'Avançado',
    isNew: true,
  },
  {
    id: '3',
    title: 'Simulado de Jurisprudência (STF/STJ)',
    description: 'Gere questões inéditas baseadas em informativos recentes dos tribunais superiores.',
    content: "Crie 5 questões de múltipla escolha estilo 'Certo ou Errado' baseadas nos informativos de jurisprudência do STF e STJ dos últimos 6 meses sobre [MATÉRIA, ex: Direito Administrativo]. Para cada questão, forneça o gabarito comentado e o número do informativo ou acórdão relacionado.",
    category: Category.EXAM_PREP,
    tags: ['Jurisprudência', 'Simulado', 'Estudos'],
    complexity: 'Intermediário',
  },
  {
    id: '103',
    title: 'Flashcards: Lei Seca',
    description: 'Transforme artigos de lei em flashcards de memorização (Pergunta e Resposta).',
    content: "Transforme os artigos [NÚMEROS DOS ARTIGOS] da Lei [NOME DA LEI] em flashcards para o Anki. O formato deve ser 'Frente: Pergunta ou lacuna sobre o conceito' e 'Verso: Resposta correta com a letra da lei'. Foque nas pegadinhas comuns de bancas.",
    category: Category.EXAM_PREP,
    tags: ['Memorização', 'Lei Seca', 'Anki'],
    complexity: 'Iniciante',
  },
  {
    id: '1',
    title: 'Resumo de Peça Processual',
    description: 'Crie um resumo executivo de uma petição inicial ou contestação longa para análise rápida.',
    content: "Atue como um advogado sênior especialista em Processo Civil. Analise o texto a seguir, que é uma [TIPO DE PEÇA], e forneça um resumo estruturado contendo: 1) Fatos principais, 2) Fundamentos jurídicos invocados, 3) Pedidos realizados. O tom deve ser formal e objetivo. Texto: [COLAR TEXTO AQUI]",
    category: Category.ANALYSIS,
    tags: ['Produtividade', 'Processo Civil', 'Resumo'],
    complexity: 'Intermediário',
  },
  {
    id: '2',
    title: 'Cláusula de Rescisão Contratual',
    description: 'Gere uma cláusula robusta de rescisão para contratos de prestação de serviços.',
    content: "Escreva uma cláusula de rescisão para um contrato de prestação de serviços de marketing digital. A cláusula deve proteger o contratante (empresa), prevendo multa de 30% em caso de rescisão sem aviso prévio de 30 dias. Inclua parágrafos sobre inadimplência e violação de confidencialidade. Use linguagem jurídica clara e precisa.",
    category: Category.LEGAL_DRAFTING,
    tags: ['Contratos', 'Civil', 'Redação'],
    complexity: 'Avançado',
  },
  {
    id: '5',
    title: 'Organização de Pauta de Audiências',
    description: 'Prompt para auxiliar secretárias e advogados na organização da agenda semanal.',
    content: "Tenho a seguinte lista desordenada de compromissos e prazos: [LISTA]. Organize-os em uma tabela cronológica, identificando conflitos de horário e sugerindo prioridades baseadas na urgência (prazos fatais primeiro).",
    category: Category.ADMINISTRATIVE,
    tags: ['Gestão', 'Organização', 'Secretariado'],
    complexity: 'Intermediário',
  },
  {
    id: '6',
    title: 'Análise de Risco em Contrato de Locação',
    description: 'Identifique cláusulas abusivas ou riscos em minutas de locação.',
    content: "Aja como um advogado imobiliarista. Revise a cláusula X do contrato de locação abaixo e aponte se há abusividade conforme a Lei do Inquilinato (Lei 8.245/91). Sugira uma redação alternativa mais equilibrada. Cláusula: [COLAR CLÁUSULA]",
    category: Category.ANALYSIS,
    tags: ['Imobiliário', 'Revisão', 'Compliance'],
    complexity: 'Avançado',
  },
  {
    id: '4',
    title: 'E-mail Formal para Cliente',
    description: 'Explicação de andamento processual para clientes leigos.',
    content: "Escreva um e-mail para um cliente informando que o juiz concedeu a liminar no processo dele. O cliente não tem conhecimento jurídico. Explique o que é uma liminar, que a decisão é provisória e quais são os próximos passos. O tom deve ser empático, profissional e tranquilizador.",
    category: Category.CLIENT_COMMS,
    tags: ['Comunicação', 'Atendimento', 'Soft Skills'],
    complexity: 'Iniciante',
  },
];