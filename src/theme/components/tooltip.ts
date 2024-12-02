import { colors } from '../colors';

export const tooltipOverrides = {
  styleOverrides: {
    tooltip: {
      backgroundColor: colors.card,
      color: colors.textPrimary,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '12px',
      fontSize: '0.875rem',
    },
    arrow: {
      color: colors.card,
    },
  },
};