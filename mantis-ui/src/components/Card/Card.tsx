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
    'bg-white',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'overflow-hidden',
    'relative',
  ];

  // Variant classes
  const variantClasses = {
    default: ['border', 'border-gray-200'],
    outlined: ['border-2', 'border-gray-300'],
    elevated: ['border', 'border-gray-200', 'shadow-md'],
    interactive: ['border', 'border-gray-200', 'cursor-pointer'],
  };

  // Padding classes
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6 md:p-6',
    none: '',
  };

  // Hover and interactive classes
  const interactiveClasses = [];
  if (hoverable || onClick) {
    interactiveClasses.push(
      'hover:shadow-lg',
      'hover:border-gray-300',
      'hover:-translate-y-0.5'
    );
  }

  if (onClick) {
    interactiveClasses.push(
      'cursor-pointer',
      'focus-visible:outline-2',
      'focus-visible:outline-blue-600',
      'focus-visible:outline-offset-2',
      'active:translate-y-0',
      'active:shadow-md'
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
    sm: '-m-3 mb-3 p-3',
    md: '-m-4 mb-4 p-4',
    lg: '-m-6 mb-6 p-6 md:-m-6 md:mb-6 md:p-6',
    none: 'p-4',
  };

  // Footer classes  
  const footerClasses = {
    sm: 'mt-3 -m-3 p-3',
    md: 'mt-4 -m-4 p-4',
    lg: 'mt-6 -m-6 p-6 md:mt-6 md:-m-6 md:p-6',
    none: 'p-4',
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
        <div className={`border-b border-gray-200 bg-gray-50 ${headerClasses[padding]}`}>
          {header}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
      {footer && (
        <div className={`border-t border-gray-200 bg-gray-50 ${footerClasses[padding]}`}>
          {footer}
        </div>
      )}
    </div>
  );
};
