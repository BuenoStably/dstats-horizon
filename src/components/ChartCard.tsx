import { Card, CardContent, Grid } from '@mui/material';
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
        display: 'flex',
        flexDirection: 'column'
      }}
      className={className}
    >
      <CardContent 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          p: '0 !important'
        }}
      >
        <Grid 
          container 
          direction="column"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Grid item>
            <ChartHeader
              title={title}
              showTimeframes={showTimeframes}
              onTimeframeChange={handleTimeframeClick}
              selectedTimeframe={selectedTimeframe}
              timeframes={timeframes}
            />
          </Grid>
          
          {legend && (
            <Grid item>
              <ChartLegend items={legend} />
            </Grid>
          )}
        </Grid>

        <Grid 
          container 
          sx={{ flexGrow: 1 }}
        >
          <Grid item xs={12} sx={{ height: '100%' }}>
            <ChartContainer>
              {children}
            </ChartContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ChartCard;