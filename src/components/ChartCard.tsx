import { Card, CardContent, Stack } from '@mui/material';
import { useState } from "react";
import ChartLegend from './chart/ChartLegend';
import ChartHeader from './chart-card/ChartHeader';
import ChartContainer from './chart-card/ChartContainer';

interface LegendItem {
  color: string;
  label: string;
}

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  onTimeframeChange?: (timeframe: string) => void;
  className?: string;
  legend?: LegendItem[];
  showTimeframes?: boolean;
}

const ChartCard = ({ 
  title, 
  children, 
  onTimeframeChange, 
  className, 
  legend,
  showTimeframes = true
}: ChartCardProps) => {
  const timeframes = ["7D", "30D", "6M", "1Y", "All"];
  const [selectedTimeframe, setSelectedTimeframe] = useState("7D");

  const handleTimeframeClick = (tf: string) => {
    setSelectedTimeframe(tf);
    if (onTimeframeChange) {
      onTimeframeChange(tf);
    }
  };

  return (
    <Card 
      elevation={0}
      variant="chart"
      sx={{ 
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      className={className}
    >
      <CardContent 
        sx={{ 
          p: 3,
          height: '100%',
          display: 'flex', 
          flexDirection: 'column',
          '&:last-child': { pb: 3 }
        }}
      >
        <Stack 
          direction="column"
          spacing={2}
          mb={3}
        >
          <ChartHeader
            title={title}
            showTimeframes={showTimeframes}
            onTimeframeChange={handleTimeframeClick}
            selectedTimeframe={selectedTimeframe}
            timeframes={timeframes}
          />
          
          {legend && <ChartLegend items={legend} />}
        </Stack>

        <ChartContainer>
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChartCard;