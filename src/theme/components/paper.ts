import { Components } from '@mui/material/styles';
import { colors } from '../colors';

export const paperOverrides: Components['MuiPaper'] = {
  variants: [
    {
      props: { variant: 'metric' as const },
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
      props: { variant: 'chart' as const },
      style: {
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        backgroundColor: colors.card,
        borderColor: colors.border,
        padding: '24px',
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: colors.cardHover,
        },
      },
    },
  ],
};