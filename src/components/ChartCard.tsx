import { Card, CardContent, Typography, Box, Button, Stack } from '@mui/material';
import { useState } from "react";
import { colors } from '../theme';

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
          p: 0, 
          display: 'flex', 
          flexDirection: 'column',
          '&:last-child': { pb: 0 }
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
                    onClick={() => handleTimeframeClick(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </Stack>
            )}
          </Stack>
          
          {legend && (
            <Stack 
              direction="row" 
              spacing={2} 
              sx={{ 
                pl: 0,
                flexWrap: 'wrap',
                gap: 1
              }}
            >
              {legend.map((item, index) => (
                <Stack key={index} direction="row" spacing={1} alignItems="center">
                  <Box 
                    sx={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '2px',
                      bgcolor: item.color 
                    }} 
                  />
                  <Typography variant="metric-label">
                    {item.label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
        <Box sx={{ 
          width: '100%',
          '& > *': { 
            width: '100%' 
          }
        }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;