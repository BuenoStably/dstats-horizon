import { Card, Box, Typography, Tooltip } from '@mui/material';
import { colors } from '../theme';

interface MetricCardProps {
  value: string;
  label: string;
  tooltip?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
}

const MetricCard = ({ value, label, tooltip, icon, isLoading, error }: MetricCardProps) => {
  return (
    <Card 
      elevation={0}
      sx={{ 
        backgroundColor: colors.card,
        borderRadius: '12px',
        padding: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        '&:hover': {
          backgroundColor: colors.cardHover,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography 
          sx={{ 
            fontSize: '1.5rem',
            fontWeight: 600,
            color: colors.primary
          }}
        >
          {isLoading ? '...' : error ? 'Error' : value}
        </Typography>
        {icon && (
          <Box 
            sx={{ 
              color: colors.textMuted,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </Box>
        )}
      </Box>
      <Tooltip title={tooltip || ''}>
        <Typography 
          sx={{ 
            fontSize: '0.875rem',
            color: colors.textMuted,
            cursor: tooltip ? 'help' : 'default'
          }}
        >
          {label}
        </Typography>
      </Tooltip>
    </Card>
  );
};

export default MetricCard;