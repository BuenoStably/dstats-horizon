import { Grid } from '@mui/material';
import MetricCard from '../MetricCard';

export interface MetricItem {
  value: string;
  label: string;
  tooltip: string;
  icon?: React.ReactNode;
}

interface MetricsGridProps {
  metrics: MetricItem[];
  isLoading?: boolean;
  error?: Error | null;
}

const MetricsGrid = ({ metrics, isLoading, error }: MetricsGridProps) => {
  return (
    <Grid container spacing={2} sx={{ mb: { xs: 3, sm: 4 } }}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} lg={2.4} key={index}>
          <MetricCard 
            {...metric}
            isLoading={isLoading}
            error={error}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MetricsGrid;