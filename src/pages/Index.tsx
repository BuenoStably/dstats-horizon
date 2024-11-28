import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { ChartSection } from "@/components/ChartSection";
import { DollarSign, Wallet, Percent, Gift } from "lucide-react";
import { useMetrics } from "@/hooks/useMetrics";
import { generateDusdMockData } from "@/utils/mockDusdData";
import { Box, Typography, Container, Grid } from "@mui/material";

const MetricsSection = () => {
  const { data: metrics, isLoading, error } = useMetrics();

  const metricsConfig = [
    {
      value: metrics?.tvl || "$0",
      label: "Total Protocol TVL",
      tooltip: "Total Value Locked across all protocol products",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.supply || "$0",
      label: "Total dUSD Supply",
      tooltip: "Current total supply of dUSD in circulation",
      icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.apy || "0%",
      label: "Net Borrow APY",
      tooltip: "Current net borrowing annual percentage yield",
      icon: <Percent className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$12.7K",
      label: "Total Rebates",
      tooltip: "Total rebates distributed to users",
      icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.lpRewards || "0x",
      label: "LP Rewards",
      tooltip: "Current liquidity provider reward multiplier",
      icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: { xs: 3, sm: 4 } }}>
      {metricsConfig.map((metric, index) => (
        <Grid item xs={12} sm={6} lg={2.4} key={index}>
          <MetricCard 
            {...metric} 
            isLoading={isLoading}
            error={error instanceof Error ? error : null}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const Index = () => {
  const mockData = generateDusdMockData();

  return (
    <Box 
      sx={{ 
        minHeight: "100vh", 
        bgcolor: "background.default",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to top, rgba(135, 2, 255, 0.5), transparent)",
          pointerEvents: "none",
          zIndex: 0
        }
      }}
    >
      <Navbar />
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
          Key Metrics
        </Typography>
        <MetricsSection />
        <ChartSection mockData={mockData} />
      </Container>
    </Box>
  );
};

export default Index;