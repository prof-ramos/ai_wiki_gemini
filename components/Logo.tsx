import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2" role="img" aria-label="AI.wiki.br logo">
      <div className="w-8 h-8 bg-legal-900 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl" aria-hidden="true">
        AI
      </div>
      <span className="font-serif text-xl font-bold tracking-tight" aria-hidden="true">
        ai<span className="text-accent">.wiki</span>.br
      </span>
    </div>
  );
};

export default Logo;
