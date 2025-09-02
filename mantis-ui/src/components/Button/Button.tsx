import React from 'react';
import './Button.css';

export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
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
  /** Icon to display before text */
  leftIcon?: React.ReactNode;
  /** Icon to display after text */
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
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseClasses = 'mantis-button';
  const variantClass = `mantis-button--${variant}`;
  const sizeClass = `mantis-button--${size}`;
  const disabledClass = disabled || loading ? 'mantis-button--disabled' : '';
  const fullWidthClass = fullWidth ? 'mantis-button--full-width' : '';
  const loadingClass = loading ? 'mantis-button--loading' : '';

  const buttonClasses = [
    baseClasses,
    variantClass,
    sizeClass,
    disabledClass,
    fullWidthClass,
    loadingClass,
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
      {leftIcon && !loading && (
        <span className="mantis-button__icon mantis-button__icon--left">
          {leftIcon}
        </span>
      )}
      <span className="mantis-button__content">
        {children}
      </span>
      {rightIcon && !loading && (
        <span className="mantis-button__icon mantis-button__icon--right">
          {rightIcon}
        </span>
      )}
    </button>
  );
};
