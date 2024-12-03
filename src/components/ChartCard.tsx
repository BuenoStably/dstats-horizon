import { Card, CardContent, Typography, Box, Stack } from '@mui/material';
import { useState } from "react";
import TimeframeSelector from './chart/TimeframeSelector';
import ChartLegend from './chart/ChartLegend';

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
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
      className={className}
    >
      <CardContent 
        sx={{ 
          p: 0, 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          '&:last-child': { pb: 0 },
          overflow: 'hidden'
        }}
      >
        <Stack 
          direction="column"
          spacing={2}
          mb={3}
        >
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
            
            {showTimeframes && onTimeframeChange && (
              <TimeframeSelector
                timeframes={timeframes}
                selectedTimeframe={selectedTimeframe}
                onTimeframeChange={handleTimeframeClick}
              />
            )}
          </Stack>
          
          {legend && <ChartLegend items={legend} />}
        </Stack>

        <Box sx={{ 
          width: '100%',
          flex: 1,
          minHeight: 0,
          display: 'flex',
          alignItems: 'flex-end',
          position: 'relative',
          '& > *': { 
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0
          }
        }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;