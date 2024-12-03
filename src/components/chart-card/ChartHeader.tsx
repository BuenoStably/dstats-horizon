import { Stack, Typography } from '@mui/material';
import TimeframeControl from './TimeframeControl';

interface ChartHeaderProps {
  title: string;
  showTimeframes: boolean;
  onTimeframeChange?: (timeframe: string) => void;
  selectedTimeframe: string;
  timeframes: string[];
}

const ChartHeader = ({ 
  title, 
  showTimeframes,
  onTimeframeChange,
  selectedTimeframe,
  timeframes
}: ChartHeaderProps) => {
  return (
    <Stack 
      direction="row" 
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          fontWeight: 600,
          pl: 0,
          textAlign: 'left'
        }}
      >
        {title}
      </Typography>
      
      <TimeframeControl
        showTimeframes={showTimeframes}
        onTimeframeChange={onTimeframeChange}
        selectedTimeframe={selectedTimeframe}
        timeframes={timeframes}
      />
    </Stack>
  );
};

export default ChartHeader;