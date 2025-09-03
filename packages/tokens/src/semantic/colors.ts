import { brandColors } from '../brand/colors.js';

export const lightTheme = {
  // Text colors
  text: {
    primary: brandColors.neutral[900],
    secondary: brandColors.neutral[600],
    tertiary: brandColors.neutral[500],
    inverse: brandColors.neutral[50],
    disabled: brandColors.neutral[400]
  },
  
  // Background colors
  background: {
    primary: brandColors.neutral[50],
    secondary: brandColors.neutral[100],
    tertiary: brandColors.neutral[200],
    inverse: brandColors.neutral[900],
    overlay: 'rgba(0, 0, 0, 0.5)'
  },
  
  // Border colors
  border: {
    primary: brandColors.neutral[200],
    secondary: brandColors.neutral[300],
    focus: brandColors.primary[500],
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981'
  },
  
  // Interactive colors
  interactive: {
    primary: {
      default: brandColors.primary[600],
      hover: brandColors.primary[700],
      active: brandColors.primary[800],
      disabled: brandColors.neutral[300]
    },
    secondary: {
      default: brandColors.secondary[600],
      hover: brandColors.secondary[700],
      active: brandColors.secondary[800],
      disabled: brandColors.neutral[300]
    }
  }
} as const;

export const darkTheme = {
  // Text colors
  text: {
    primary: brandColors.neutral[50],
    secondary: brandColors.neutral[300],
    tertiary: brandColors.neutral[400],
    inverse: brandColors.neutral[900],
    disabled: brandColors.neutral[600]
  },
  
  // Background colors
  background: {
    primary: brandColors.neutral[950],
    secondary: brandColors.neutral[900],
    tertiary: brandColors.neutral[800],
    inverse: brandColors.neutral[50],
    overlay: 'rgba(0, 0, 0, 0.7)'
  },
  
  // Border colors
  border: {
    primary: brandColors.neutral[800],
    secondary: brandColors.neutral[700],
    focus: brandColors.primary[400],
    error: '#f87171',
    warning: '#fbbf24',
    success: '#34d399'
  },
  
  // Interactive colors
  interactive: {
    primary: {
      default: brandColors.primary[500],
      hover: brandColors.primary[400],
      active: brandColors.primary[300],
      disabled: brandColors.neutral[700]
    },
    secondary: {
      default: brandColors.secondary[500],
      hover: brandColors.secondary[400],
      active: brandColors.secondary[300],
      disabled: brandColors.neutral[700]
    }
  }
} as const;

// For backward compatibility
export const semanticColors = lightTheme;