import { Stack, Box, Typography } from '@mui/material';

interface LegendItem {
  color: string;
  label: string;
}

interface ChartLegendProps {
  items: LegendItem[];
}

const ChartLegend = ({ items }: ChartLegendProps) => {
  return (
    <Stack 
      direction="row" 
      spacing={2} 
      sx={{ 
        pl: 0,
        flexWrap: 'wrap',
        gap: 1
      }}
    >
      {items.map((item, index) => (
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
  );
};

export default ChartLegend;