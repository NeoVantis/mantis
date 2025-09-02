import React from 'react';
import './Card.css';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Card variant */
  variant?: 'default' | 'outlined' | 'elevated' | 'interactive';
  /** Card padding */
  padding?: 'sm' | 'md' | 'lg' | 'none';
  /** Whether card is hoverable */
  hoverable?: boolean;
  /** Click handler for interactive cards */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional CSS classes */
  className?: string;
  /** Card header content */
  header?: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  className = '',
  header,
  footer,
  ...props
}) => {
  const baseClasses = 'mantis-card';
  const variantClass = `mantis-card--${variant}`;
  const paddingClass = padding !== 'none' ? `mantis-card--padding-${padding}` : '';
  const hoverableClass = (hoverable || onClick) ? 'mantis-card--hoverable' : '';
  const interactiveClass = onClick ? 'mantis-card--interactive' : '';

  const cardClasses = [
    baseClasses,
    variantClass,
    paddingClass,
    hoverableClass,
    interactiveClass,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as any);
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {header && (
        <div className="mantis-card__header">
          {header}
        </div>
      )}
      <div className="mantis-card__content">
        {children}
      </div>
      {footer && (
        <div className="mantis-card__footer">
          {footer}
        </div>
      )}
    </div>
  );
};
