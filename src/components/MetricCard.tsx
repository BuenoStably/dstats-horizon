import { HelpOutline } from '@mui/icons-material';
import { Card, CardContent, Typography, Box, Tooltip, Skeleton } from '@mui/material';
import { colors } from '../theme';

interface MetricCardProps {
  value: string;
  label: string;
  tooltip: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
}

const MetricCard = ({ value, label, tooltip, icon, isLoading, error }: MetricCardProps) => {
  return (
    <Card variant="metric">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography 
          variant="metric-value"
          sx={{ color: error ? colors.error : colors.primary }}
        >
          {isLoading ? (
            <Skeleton width={100} />
          ) : error ? (
            'Error'
          ) : (
            value
          )}
        </Typography>
        {icon && <Box sx={{ color: colors.primary }}>{icon}</Box>}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <Typography variant="metric-label">
          {label}
        </Typography>
        <Tooltip title={error ? error.message : tooltip}>
          <HelpOutline sx={{ 
            width: { xs: '0.75rem', sm: '1rem' }, 
            height: { xs: '0.75rem', sm: '1rem' },
            color: colors.textMuted,
            cursor: 'pointer'
          }} />
        </Tooltip>
      </Box>
    </Card>
  );
};

export default MetricCard;