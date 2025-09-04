import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  // Base classes for all cards
  const baseClasses = [
    'flex',
    'flex-col',
    'bg-mantis-white',
    'rounded-mantis-lg',
    'transition-all',
    'duration-mantis-base',
    'overflow-hidden',
    'relative',
  ];

  // Variant classes
  const variantClasses = {
    default: ['border', 'border-mantis-gray-200'],
    outlined: ['border-2', 'border-mantis-gray-300'],
    elevated: ['border', 'border-mantis-gray-200', 'shadow-mantis-md'],
    interactive: ['border', 'border-mantis-gray-200', 'cursor-pointer'],
  };

  // Padding classes
  const paddingClasses = {
    sm: 'p-mantis-3',
    md: 'p-mantis-4',
    lg: 'p-mantis-6 md:p-mantis-6', // Same padding (p-mantis-6) on mobile and medium 
    none: '',
  };

  // Hover and interactive classes
  const interactiveClasses = [];
  if (hoverable || onClick) {
    interactiveClasses.push(
      'hover:shadow-mantis-lg',
      'hover:border-mantis-gray-300',
      'hover:-translate-y-0.5'
    );
  }

  if (onClick) {
    interactiveClasses.push(
      'cursor-pointer',
      'focus-visible:outline-2',
      'focus-visible:outline-mantis-primary',
      'focus-visible:outline-offset-2',
      'active:translate-y-0',
      'active:shadow-mantis-md'
    );
  }

  // Combine all classes
  const cardClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    paddingClasses[padding],
    ...interactiveClasses,
    className,
  ].filter(Boolean).join(' ');

  // Header classes
  const headerClasses = {
    sm: '-m-mantis-3 mb-mantis-3 p-mantis-3',
    md: '-m-mantis-4 mb-mantis-4 p-mantis-4',
    lg: '-m-mantis-6 mb-mantis-6 p-mantis-6 md:-m-mantis-6 md:mb-mantis-6 md:p-mantis-6',
    none: 'p-mantis-4',
  };

  // Footer classes  
  const footerClasses = {
    sm: 'mt-mantis-3 -m-mantis-3 p-mantis-3',
    md: 'mt-mantis-4 -m-mantis-4 p-mantis-4',
    lg: 'mt-mantis-6 -m-mantis-6 p-mantis-6 md:mt-mantis-6 md:-m-mantis-6 md:p-mantis-6',
    none: 'p-mantis-4',
  };

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
        <div className={`border-b border-mantis-gray-200 bg-mantis-gray-50 ${headerClasses[padding]}`}>
          {header}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
      {footer && (
        <div className={`border-t border-mantis-gray-200 bg-mantis-gray-50 ${footerClasses[padding]}`}>
          {footer}
        </div>
      )}
    </div>
  );
};
