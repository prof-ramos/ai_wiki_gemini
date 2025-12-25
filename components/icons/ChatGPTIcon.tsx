import React from 'react';

interface ChatGPTIconProps {
  className?: string;
  ariaLabel?: string;
}

const ChatGPTIcon: React.FC<ChatGPTIconProps> = ({ className = '', ariaLabel }) => {
  const titleId = ariaLabel ? `chatgpt-icon-${Math.random().toString(36).substr(2, 9)}` : undefined;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
      aria-hidden={!ariaLabel}
    >
      {ariaLabel && <title id={titleId}>{ariaLabel}</title>}
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 12 0c-1.686 0-3.228.686-4.34 1.795a5.97 5.97 0 0 0-6.51 2.9 5.974 5.974 0 0 0-.516 4.91 6.023 6.023 0 0 0 0 4.359 5.985 5.985 0 0 0 .516 4.91 6.046 6.046 0 0 0 6.51 2.9A6.065 6.065 0 0 0 12 24a6.065 6.065 0 0 0 4.256-1.004 5.97 5.97 0 0 0 6.51-2.9 5.974 5.974 0 0 0 .516-4.91 6.023 6.023 0 0 0 0-4.359zM12 2.25a3.75 3.75 0 0 1 3.328 2.047 5.96 5.96 0 0 0-3.328.977 5.96 5.96 0 0 0-3.328-.977A3.75 3.75 0 0 1 12 2.25zm-6.75 15a3.75 3.75 0 0 1-1.797-7.078 5.96 5.96 0 0 0 .977 3.328 5.96 5.96 0 0 0-.977 3.328c.284.137.588.252.906.344a3.72 3.72 0 0 1 .891-.922zm13.5 0c-.307.37-.674.69-1.078.94a3.72 3.72 0 0 1 .891.922c.318-.092.622-.207.906-.344a5.96 5.96 0 0 0-.977-3.328 5.96 5.96 0 0 0 .977-3.328A3.75 3.75 0 0 1 18.75 17.25zM12 18.75a3.75 3.75 0 0 1-3.328-2.047 5.96 5.96 0 0 0 3.328-.977 5.96 5.96 0 0 0 3.328.977A3.75 3.75 0 0 1 12 18.75z" />
    </svg>
  );
};

export default ChatGPTIcon;
