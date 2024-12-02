import { colors } from './colors';

export const typography = {
  fontFamily: 'Inter, sans-serif',
  h1: {
    fontWeight: 700,
  },
  h2: {
    fontWeight: 600,
  },
  h3: {
    fontWeight: 600,
  },
  h4: {
    fontWeight: 600,
  },
  h5: {
    fontWeight: 600,
  },
  h6: {
    fontWeight: 600,
  },
  'metric-value': {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: colors.primary,
  } as const,
  'metric-label': {
    fontSize: '0.875rem',
    color: colors.textMuted,
  } as const,
};