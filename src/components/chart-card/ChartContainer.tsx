import { Box } from '@mui/material';

interface ChartContainerProps {
  children: React.ReactNode;
}

const ChartContainer = ({ children }: ChartContainerProps) => {
  return (
    <Box sx={{ 
      width: '100%',
      flex: 1,
      minHeight: 0,
      display: 'flex',
      position: 'relative',
      '& > *': { 
        width: '100%',
        height: '100%'
      }
    }}>
      {children}
    </Box>
  );
};

export default ChartContainer;