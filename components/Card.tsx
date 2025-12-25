/**
 * Card.tsx - Componente Card Genérico Reutilizável
 *
 * Componente flexível para exibição de conteúdo em cartões.
 * Suporta múltiplas variantes visuais, seções opcionais (header/footer)
 * e interatividade configurável.
 *
 * @example
 * // Card simples
 * <Card variant="default">
 *   <h3>Título</h3>
 *   <p>Conteúdo</p>
 * </Card>
 *
 * @example
 * // Card interativo completo
 * <Card
 *   variant="interactive"
 *   header={<h3>Cabeçalho</h3>}
 *   footer={<button>Ação</button>}
 *   onClick={() => handleClick()}
 *   ariaLabel="Card clicável"
 * >
 *   <p>Conteúdo principal</p>
 * </Card>
 */

import React from 'react';

/**
 * Props base compartilhadas entre cards clicáveis e não-clicáveis
 */
interface BaseCardProps {
  /** Conteúdo principal do card */
  children: React.ReactNode;

  /**
   * Variante visual do card
   * - default: Card padrão com borda sutil e sombra leve
   * - outlined: Apenas borda, sem sombra
   * - elevated: Sombra pronunciada, estilo "flutuante"
   * - flat: Sem borda nem sombra, minimalista
   * - interactive: Estilo PromptCard com animações completas
   */
  variant?: 'default' | 'outlined' | 'elevated' | 'flat' | 'interactive';

  /** Conteúdo opcional para o cabeçalho */
  header?: React.ReactNode;

  /** Conteúdo opcional para o rodapé */
  footer?: React.ReactNode;

  /** Classes CSS customizadas adicionais */
  className?: string;

  /**
   * Tamanho do padding interno
   * - none: Sem padding
   * - sm: Padding pequeno (1rem)
   * - md: Padding médio (1.5rem) - padrão
   * - lg: Padding grande (2rem)
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /**
   * Ativa efeitos de hover
   * Se não especificado, será true automaticamente para variant=interactive ou quando onClick presente
   */
  hoverable?: boolean;

  /** Adiciona animação de entrada ao montar */
  animated?: boolean;
}

/**
 * Props para cards clicáveis - ariaLabel é OBRIGATÓRIO para acessibilidade
 */
interface ClickableCardProps extends BaseCardProps {
  /** Handler para cliques no card inteiro */
  onClick: () => void;

  /** Label para acessibilidade - OBRIGATÓRIO para cards clicáveis */
  ariaLabel: string;

  /** Atributo role para acessibilidade (opcional, button já tem role implícito) */
  role?: string;
}

/**
 * Props para cards não-clicáveis - ariaLabel é opcional
 */
interface NonClickableCardProps extends BaseCardProps {
  /** Cards não-clicáveis não devem ter onClick */
  onClick?: never;

  /** Label para acessibilidade - opcional para cards não-interativos */
  ariaLabel?: string;

  /** Atributo role para acessibilidade (ex: "region", "article") */
  role?: string;
}

/**
 * União discriminada: garante type safety entre cards clicáveis e não-clicáveis
 */
type CardProps = ClickableCardProps | NonClickableCardProps;

/**
 * Componente Card - Container genérico reutilizável
 *
 * Componente de card flexível que suporta diferentes estilos visuais,
 * seções opcionais (header/footer), interatividade e acessibilidade completa.
 */
const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  header,
  footer,
  onClick,
  className = '',
  padding = 'md',
  hoverable,
  role,
  ariaLabel,
  animated = false,
}) => {
  // Lógica para determinar se deve ter hover effects
  // Automático para variant=interactive ou quando onClick presente
  const isHoverable = hoverable ?? (variant === 'interactive' || !!onClick);

  // Mapeamento de classes base por variant
  const variantClasses = {
    default: 'bg-white border border-legal-100 shadow-sm',
    outlined: 'bg-transparent border-2 border-legal-200',
    elevated: 'bg-white border-0 shadow-lg',
    flat: 'bg-legal-50 border-0 shadow-none',
    interactive: 'bg-white border border-legal-100 shadow-sm',
  };

  // Hover effects por variant (aplicados apenas se isHoverable = true)
  const hoverClasses = {
    default: 'hover:shadow-md hover:border-legal-200',
    outlined: 'hover:border-accent',
    elevated: 'hover:shadow-xl motion-safe:hover:scale-[1.02]',
    flat: 'hover:bg-legal-100',
    interactive: 'hover:shadow-lg hover:border-accent motion-safe:hover:scale-105 hover:z-10',
  };

  // Mapeamento de padding para o body (padding completo)
  const paddingMap = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  // Mapeamento de padding para header/footer (horizontal igual, vertical reduzido)
  const headerFooterPaddingMap = {
    none: '',
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  // Classes base do card
  const baseClasses = 'rounded-xl flex flex-col';

  // Reset de estilos para <button> (apenas quando onClick presente)
  const buttonResetClasses = onClick
    ? 'border-0 bg-transparent p-0 font-inherit text-inherit text-left w-full focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-xl'
    : '';

  // Classes de transição (mais elaborada para interactive)
  const transitionClasses = variant === 'interactive'
    ? 'transition-all duration-300 ease-in-out transform-gpu'
    : 'transition-all duration-200';

  // Active state para feedback visual ao clicar
  const activeClasses = (variant === 'interactive' || onClick) ? 'motion-safe:active:scale-[0.98]' : '';

  // Cursor pointer para cards clicáveis
  const cursorClasses = onClick ? 'cursor-pointer' : '';

  // Animação de entrada opcional
  const animationClasses = animated ? 'animate-fade-in-up' : '';

  // Classe group para permitir group-hover no footer (aplicada quando hoverable)
  const groupClass = isHoverable ? 'group' : '';

  // Construção dinâmica das classes finais
  const finalClasses = [
    baseClasses,
    buttonResetClasses,
    variantClasses[variant],
    isHoverable ? hoverClasses[variant] : '',
    transitionClasses,
    activeClasses,
    cursorClasses,
    animationClasses,
    groupClass,
    className,
  ].filter(Boolean).join(' ');

  // Conteúdo compartilhado entre button e article
  const cardContent = (
    <>
      {/* Header Section */}
      {header && (
        <div className={`border-b border-legal-100 ${headerFooterPaddingMap[padding]}`}>
          {header}
        </div>
      )}

      {/* Body/Content Section */}
      <div className={`flex-1 ${paddingMap[padding]}`}>
        {children}
      </div>

      {/* Footer Section */}
      {footer && (
        <div className={`border-t border-transparent group-hover:border-legal-50 ${headerFooterPaddingMap[padding]}`}>
          {footer}
        </div>
      )}
    </>
  );

  // Renderizar <button> para cards clicáveis, <article> para não-clicáveis
  return onClick ? (
    <button
      type="button"
      className={finalClasses}
      onClick={onClick}
      aria-label={ariaLabel}
      role={role}
    >
      {cardContent}
    </button>
  ) : (
    <article
      className={finalClasses}
      role={role}
      aria-label={ariaLabel}
    >
      {cardContent}
    </article>
  );
};

export default Card;
