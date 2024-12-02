import { createTheme } from '@mui/material/styles';
import { colors } from './theme/colors';
import { typography } from './theme/typography';
import { components } from './theme/components';
import './theme/types';

export { colors };

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
  typography,
  components,
});

export default theme;