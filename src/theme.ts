import { createTheme } from '@mui/material/styles';
import './theme/types';

export const colors = {
  // Base colors
  background: 'rgb(18, 17, 28)',
  surface: 'rgb(23, 22, 36)',
  card: 'rgb(31, 29, 43)',
  cardHover: 'rgb(35, 33, 47)',
  
  // Brand colors
  primary: '#8702ff',
  primaryLight: '#9b87f5',
  primaryDark: '#6E59A5',
  secondary: '#22C55E',
  secondaryLight: '#34d673',
  secondaryDark: '#15803d',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: '#9CA3AF',
  
  // Chart colors
  chartGrid: '#4B5563',
  chartGridOpaque: 'rgba(75, 85, 99, 0.2)',
  candlestickUp: '#22C55E',
  candlestickDown: '#EF4444',
  
  // Border colors
  border: 'rgba(255, 255, 255, 0.1)',
  
  // Status colors
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F97316',
  info: '#3B82F6'
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      light: colors.primaryLight,
      dark: colors.primaryDark,
    },
    secondary: {
      main: colors.secondary,
      light: colors.secondaryLight,
      dark: colors.secondaryDark,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
  },
  typography: {
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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
        },
      },
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            background: 'linear-gradient(45deg, #8702ff 30%, #9b87f5 90%)',
            color: 'white',
            boxShadow: '0 3px 5px 2px rgba(135, 2, 255, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #7502dd 30%, #8b77e5 90%)',
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            borderColor: colors.primary,
            color: colors.primary,
            '&:hover': {
              borderColor: colors.primaryLight,
              backgroundColor: 'rgba(135, 2, 255, 0.04)',
            },
          },
        },
      ],
    },
    MuiCard: {
      variants: [
        {
          props: { variant: 'metric' },
          style: {
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding: '16px',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: colors.cardHover,
              transform: 'translateY(-2px)',
            },
          },
        },
        {
          props: { variant: 'chart' },
          style: {
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding: '24px',
            height: '100%',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: colors.cardHover,
            },
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'metric' },
          style: {
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding: '16px',
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: colors.cardHover,
              transform: 'translateY(-2px)',
            },
          },
        },
        {
          props: { variant: 'chart' },
          style: {
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            backgroundColor: colors.card,
            borderColor: colors.border,
            padding: '24px',
            height: '100%',
            transition: 'background-color 0.2s',
            '&:hover': {
              backgroundColor: colors.cardHover,
            },
          },
        },
      ],
    },
    MuiTooltip: {
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
    },
  },
});

export default theme;