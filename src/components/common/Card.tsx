import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', style, noPadding = false }) => {
  return (
    <div
      className={`custom-card ${className}`}
      style={{
        backgroundColor: 'var(--card-bg)',
        borderRadius: '14px',
        boxShadow: 'var(--shadow)',
        padding: noPadding ? '0' : '24px',
        border: '1px solid var(--border)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
