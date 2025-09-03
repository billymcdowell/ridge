import { brandColors } from './brand/colors.js';
import { semanticColors } from './semantic/colors.js';
import { brandSpacing } from './brand/spacing.js';
import { brandTypography } from './brand/typography.js';

export { brandColors } from './brand/colors.js';
export { brandTypography } from './brand/typography.js';
export { brandSpacing } from './brand/spacing.js';
export { semanticColors, lightTheme, darkTheme } from './semantic/colors.js';
export { ThemeManager, type Theme } from './utils/theme.js';

// CSS custom property helpers
export const getCSSVar = (path: string): string => `var(--${path.replace(/\./g, '-')})`;

// Type-safe token access
export type ColorToken = keyof typeof brandColors | keyof typeof semanticColors;
export type SpacingToken = keyof typeof brandSpacing;
export type TypographyToken = keyof typeof brandTypography;