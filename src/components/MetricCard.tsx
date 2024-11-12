import { HelpOutline } from '@mui/icons-material';
import { Card, CardContent, Typography, Box, Tooltip, Skeleton } from '@mui/material';

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
    <Card 
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.08)'
        }
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              color: error ? 'error.main' : '#8702ff',
              fontWeight: 'bold',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            {isLoading ? (
              <Skeleton width={100} />
            ) : error ? (
              'Error'
            ) : (
              value
            )}
          </Typography>
          {icon && <Box sx={{ color: '#8702ff' }}>{icon}</Box>}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'white',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            {label}
          </Typography>
          <Tooltip 
            title={error ? error.message : tooltip}
            sx={{
              bgcolor: 'rgb(36, 36, 36)',
              '& .MuiTooltip-tooltip': {
                bgcolor: 'rgb(36, 36, 36)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }
            }}
          >
            <HelpOutline sx={{ 
              width: { xs: '0.75rem', sm: '1rem' }, 
              height: { xs: '0.75rem', sm: '1rem' },
              color: 'white'
            }} />
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MetricCard;