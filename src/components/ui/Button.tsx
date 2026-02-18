import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-6 py-3 rounded-lg font-medium transition-colors touch-action-manipulation';
  const variants = {
    primary: 'bg-primary text-secondary hover:bg-gray-800',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-secondary',
    ghost: 'text-primary hover:bg-gray-100',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
