import React from 'react';

interface CreditCoinProps {
  amount?: number | string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
  className?: string;
}

export const CreditCoin: React.FC<CreditCoinProps> = ({
  amount,
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-5 h-5 text-[10px]',
    md: 'w-7 h-7 text-xs',
    lg: 'w-9 h-9 text-sm',
    xl: 'w-12 h-12 text-base',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono-val font-bold ${className}`}>
      <span
        style={{ backgroundColor: 'var(--mustard)', borderColor: 'var(--ink)' }}
        className={`${sizeMap[size]} rounded-full border-2 flex items-center justify-center text-[var(--ink)] shadow-[1px_1px_0px_var(--ink)] flex-shrink-0 select-none font-bold`}
        title="SkillBarter Time-Bank Credit"
      >
        C
      </span>
      {amount !== undefined && (
        <span className="text-[var(--ink)] tracking-tight">
          {typeof amount === 'number' ? (Number.isInteger(amount) ? amount.toFixed(1) : amount) : amount}
          {showLabel && <span className="font-sans text-xs ml-1 font-normal text-[var(--muted)]">credits</span>}
        </span>
      )}
    </span>
  );
};
