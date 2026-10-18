import React from 'react';

interface SquiggleProps {
  color?: string;
  className?: string;
}

export const SquiggleUnderline: React.FC<SquiggleProps> = ({
  color = 'var(--mustard)',
  className = '',
}) => {
  return (
    <svg
      className={`inline-block w-full overflow-visible ${className}`}
      height="12"
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8C20 2 35 12 50 7C65 2 80 12 98 6"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HandDrawnCircle: React.FC<{ color?: string; className?: string }> = ({
  color = 'var(--forest)',
  className = '',
}) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none -m-1 ${className}`}
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 20 C6 8, 40 4, 100 6 C116 7, 118 28, 104 34 C70 38, 20 37, 6 26"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="200"
        strokeLinecap="round"
      />
    </svg>
  );
};
