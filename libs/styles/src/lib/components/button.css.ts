import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../tokens/colors.css';

const base = style({
  padding: '8px 16px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'all 0.2s ease-in-out',
});

export const button = recipe({
  base,
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.primary,
        color: '#ffffff',
        ':hover': {
          backgroundColor: '#0052A3',
        },
      },
      secondary: {
        backgroundColor: vars.colors.secondary,
        color: '#ffffff',
        ':hover': {
          backgroundColor: '#333333',
        },
      },
    },
    size: {
      small: {
        padding: '4px 8px',
        fontSize: '14px',
      },
      large: {
        padding: '12px 24px',
        fontSize: '18px',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'small',
  },
});
