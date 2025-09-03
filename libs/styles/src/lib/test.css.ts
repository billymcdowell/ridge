import { style } from '@vanilla-extract/css';

export const testClass = style({
  backgroundColor: 'blue',
  color: 'white',
  padding: '1rem',
  borderRadius: '4px',
  ':hover': {
    backgroundColor: 'darkblue',
  },
});
