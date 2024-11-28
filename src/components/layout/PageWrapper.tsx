import { Box, Container, Typography } from '@mui/material';

interface PageWrapperProps {
  children: React.ReactNode;
  title: string;
}

const PageWrapper = ({ children, title }: PageWrapperProps) => {
  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        bgcolor: "transparent",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to top, rgba(135, 2, 255, 0.15), transparent)",
          pointerEvents: "none",
          zIndex: 0,
          backdropFilter: "brightness(0.7)"
        }
      }}
    >
      <Container 
        sx={{ 
          px: { xs: 2, sm: 3 }, 
          py: { xs: 3, sm: 4 },
          minHeight: 'calc(100vh - 73px)',
          position: "relative",
          zIndex: 1
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontWeight: 'bold',
            mb: { xs: 2, sm: 3 }
          }}
        >
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  );
};

export default PageWrapper;