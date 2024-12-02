import { Button, Stack } from '@mui/material';
import { colors } from '../../theme';

interface TimeframeSelectorProps {
  timeframes: string[];
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const TimeframeSelector = ({ 
  timeframes, 
  selectedTimeframe, 
  onTimeframeChange 
}: TimeframeSelectorProps) => {
  return (
    <Stack direction="row" spacing={1}>
      {timeframes.map((tf) => (
        <Button
          key={tf}
          variant={selectedTimeframe === tf ? 'contained' : 'text'}
          sx={{
            minWidth: 0,
            padding: '6px 12px',
            color: selectedTimeframe === tf ? colors.textPrimary : colors.textMuted,
            backgroundColor: selectedTimeframe === tf ? colors.primary : 'transparent',
            '&:hover': {
              backgroundColor: selectedTimeframe === tf ? colors.primaryDark : 'rgba(255, 255, 255, 0.1)',
            },
          }}
          onClick={() => onTimeframeChange(tf)}
        >
          {tf}
        </Button>
      ))}
    </Stack>
  );
};

export default TimeframeSelector;