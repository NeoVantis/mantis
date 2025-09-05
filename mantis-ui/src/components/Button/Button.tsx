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
    'font-sans',
    'font-medium',
    'no-underline',
    'border',
    'rounded-md',
    'cursor-pointer',
    'transition-colors',
    'outline-none',
    'whitespace-nowrap',
    'select-none',
    'focus-visible:outline-2',
    'focus-visible:outline-blue-600',
    'focus-visible:outline-offset-2',
  ];

  // Size classes
  const sizeClasses = {
    sm: isIconOnly
      ? ['p-2', 'w-8', 'h-8', 'text-sm']
      : ['px-3', 'py-2', 'text-sm', 'gap-1', 'min-h-8'],
    md: isIconOnly
      ? ['p-3', 'w-10', 'h-10', 'text-base']
      : ['px-4', 'py-3', 'text-base', 'gap-2', 'min-h-10'],
    lg: isIconOnly
      ? ['p-4', 'w-12', 'h-12', 'text-lg']
      : ['px-6', 'py-4', 'text-lg', 'gap-2', 'min-h-12'],
  };

  // Variant classes
  const variantClasses = {
    primary: [
      'bg-blue-600',
      'text-white',
      'border-blue-600',
      'hover:bg-blue-700',
      'hover:border-blue-700',
    ],
    secondary: [
      'bg-gray-100',
      'text-gray-900',
      'border-gray-300',
      'hover:bg-gray-200',
      'hover:border-gray-400',
    ],
    success: [
      'bg-emerald-500',
      'text-white',
      'border-emerald-500',
      'hover:bg-emerald-600',
      'hover:border-emerald-600',
    ],
    warning: [
      'bg-amber-500',
      'text-white',
      'border-amber-500',
      'hover:bg-amber-600',
      'hover:border-amber-600',
    ],
    error: [
      'bg-red-500',
      'text-white',
      'border-red-500',
      'hover:bg-red-600',
      'hover:border-red-600',
    ],
    ghost: [
      'bg-transparent',
      'text-gray-700',
      'border-transparent',
      'hover:bg-gray-100',
      'hover:text-gray-900',
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
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
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
