import React from 'react';

interface GeminiIconProps {
  className?: string;
}

const GeminiIcon: React.FC<GeminiIconProps> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.82 8 12 11.82 5.18 8 12 4.18zM5 9.82l6 3.35v6.65l-6-3.35V9.82zm8 10v-6.65l6-3.35v6.65l-6 3.35z" />
    </svg>
  );
};

export default GeminiIcon;
