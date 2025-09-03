// libs/react/src/lib/Button/Button.tsx
import React from 'react';
import { button } from '@ridge/styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'small',
  className,
  ...props
}) => {
  return <button className={button({ variant, size })} {...props} />;
};
