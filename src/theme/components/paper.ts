import { colors } from '../colors';

export const paperOverrides = {
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
        transition: 'background-color 0.2s',
        '&:hover': {
          backgroundColor: colors.cardHover,
        },
      },
    },
  ],
};