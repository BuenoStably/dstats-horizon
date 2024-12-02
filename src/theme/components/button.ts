import { Components } from '@mui/material/styles';
import { colors } from '../colors';

export const buttonOverrides: Components['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
  },
  styleOverrides: {
    root: {
      textTransform: 'none' as const,
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
};