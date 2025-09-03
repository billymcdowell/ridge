import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    primary: '#0066CC',
    secondary: '#4D4D4D',
    success: '#28A745',
    error: '#DC3545',
    warning: '#FFC107',
    background: '#FFFFFF',
    text: '#000000',
  },
});
