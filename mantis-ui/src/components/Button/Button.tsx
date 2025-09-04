import React from 'react';

export interface ButtonProps {
  /** Button content */
  children?: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether button is disabled */
  disabled?: boolean;
  /** Whether button is loading */
  loading?: boolean;
  /** Whether button is full width */
  fullWidth?: boolean;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Additional CSS classes */
  className?: string;
  /** Icon to display with the button */
  icon?: React.ReactNode;
  /** Position of the icon relative to the text */
  iconPosition?: 'left' | 'right';
  /** @deprecated Use icon and iconPosition instead */
  leftIcon?: React.ReactNode;
  /** @deprecated Use icon and iconPosition instead */
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Handle backward compatibility
  const actualIcon = icon || leftIcon || rightIcon;
  const actualIconPosition = icon 
    ? iconPosition 
    : leftIcon 
    ? 'left' 
    : rightIcon 
    ? 'right' 
    : iconPosition;

  const isIconOnly = actualIcon && !children;

  // Base classes - shared by all buttons
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'relative',
    'font-mantis',
    'font-medium',
    'no-underline',
    'border',
    'rounded-mantis-md',
    'cursor-pointer',
    'transition-mantis-colors',
    'outline-none',
    'whitespace-nowrap',
    'select-none',
    'focus-visible:outline-2',
    'focus-visible:outline-mantis-primary',
    'focus-visible:outline-offset-2',
  ];

  // Size classes
  const sizeClasses = {
    sm: isIconOnly 
      ? ['p-mantis-2', 'w-8', 'h-8', 'text-mantis-sm'] 
      : ['px-mantis-3', 'py-mantis-2', 'text-mantis-sm', 'gap-mantis-1', 'min-h-8'],
    md: isIconOnly 
      ? ['p-mantis-3', 'w-10', 'h-10', 'text-mantis-base'] 
      : ['px-mantis-4', 'py-mantis-3', 'text-mantis-base', 'gap-mantis-2', 'min-h-10'],
    lg: isIconOnly 
      ? ['p-mantis-4', 'w-12', 'h-12', 'text-mantis-lg'] 
      : ['px-mantis-6', 'py-mantis-4', 'text-mantis-lg', 'gap-mantis-2', 'min-h-12'],
  };

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-mantis-primary',
      'text-mantis-white',
      'border-mantis-primary',
      'hover:bg-mantis-primary-dark',
      'hover:border-mantis-primary-dark',
    ],
    secondary: [
      'bg-mantis-gray-100',
      'text-mantis-gray-900',
      'border-mantis-gray-300',
      'hover:bg-mantis-gray-200',
      'hover:border-mantis-gray-400',
    ],
    success: [
      'bg-mantis-success',
      'text-mantis-white',
      'border-mantis-success',
      'hover:bg-emerald-600',
      'hover:border-emerald-600',
    ],
    warning: [
      'bg-mantis-warning',
      'text-mantis-white',
      'border-mantis-warning',
      'hover:bg-amber-600',
      'hover:border-amber-600',
    ],
    error: [
      'bg-mantis-error',
      'text-mantis-white',
      'border-mantis-error',
      'hover:bg-red-600',
      'hover:border-red-600',
    ],
    ghost: [
      'bg-transparent',
      'text-mantis-gray-700',
      'border-transparent',
      'hover:bg-mantis-gray-100',
      'hover:text-mantis-gray-900',
    ],
  };

  // State modifier classes
  const stateClasses = [
    ...(disabled || loading ? ['opacity-50', 'cursor-not-allowed', 'pointer-events-none'] : ['hover:enabled:active:translate-y-px']),
    ...(fullWidth ? ['w-full'] : []),
  ];

  // Combine all classes
  const buttonClasses = [
    ...baseClasses,
    ...sizeClasses[size],
    ...variantClasses[variant],
    ...stateClasses,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="flex items-center justify-center" aria-hidden="true">
          <svg className="animate-mantis-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4" 
              className="opacity-25"
            />
            <path 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              className="opacity-75"
            />
          </svg>
        </span>
      )}
      
      {/* Render icon based on position */}
      {actualIcon && !loading && actualIconPosition === 'left' && (
        <span className="flex items-center justify-center flex-shrink-0" aria-hidden="true">
          {actualIcon}
        </span>
      )}
      
      {/* Render content only if there is text content */}
      {children && (
        <span className="flex items-center justify-center">
          {children}
        </span>
      )}
      
      {actualIcon && !loading && actualIconPosition === 'right' && (
        <span className="flex items-center justify-center flex-shrink-0" aria-hidden="true">
          {actualIcon}
        </span>
      )}
    </button>
  );
};
