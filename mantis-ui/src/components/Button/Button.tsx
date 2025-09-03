import React from 'react';
import './Button.css';

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

  const baseClasses = 'mantis-button';
  const variantClass = `mantis-button--${variant}`;
  const sizeClass = `mantis-button--${size}`;
  const disabledClass = disabled || loading ? 'mantis-button--disabled' : '';
  const fullWidthClass = fullWidth ? 'mantis-button--full-width' : '';
  const loadingClass = loading ? 'mantis-button--loading' : '';
  const iconOnlyClass = actualIcon && !children ? 'mantis-button--icon-only' : '';

  const buttonClasses = [
    baseClasses,
    variantClass,
    sizeClass,
    disabledClass,
    fullWidthClass,
    loadingClass,
    iconOnlyClass,
    className
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
        <span className="mantis-button__spinner" aria-hidden="true">
          <svg className="mantis-animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
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
        <span className="mantis-button__icon mantis-button__icon--left">
          {actualIcon}
        </span>
      )}
      
      {/* Render content only if there is text content */}
      {children && (
        <span className="mantis-button__content">
          {children}
        </span>
      )}
      
      {actualIcon && !loading && actualIconPosition === 'right' && (
        <span className="mantis-button__icon mantis-button__icon--right">
          {actualIcon}
        </span>
      )}
    </button>
  );
};
