import { Stack } from '@mui/material';
import TimeframeSelector from '../chart/TimeframeSelector';

interface TimeframeControlProps {
  showTimeframes: boolean;
  onTimeframeChange?: (timeframe: string) => void;
  selectedTimeframe: string;
  timeframes: string[];
}

const TimeframeControl = ({ 
  showTimeframes, 
  onTimeframeChange, 
  selectedTimeframe,
  timeframes 
}: TimeframeControlProps) => {
  if (!showTimeframes || !onTimeframeChange) return null;

  return (
    <TimeframeSelector
      timeframes={timeframes}
      selectedTimeframe={selectedTimeframe}
      onTimeframeChange={onTimeframeChange}
    />
  );
};

export default TimeframeControl;