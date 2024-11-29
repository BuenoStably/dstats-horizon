import { Box, Container, Grid } from "@mui/material";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChartCard from "@/components/ChartCard";
import LineChartWithGradient from "@/components/charts/LineChartWithGradient";
import PageWrapper from "@/components/layout/PageWrapper";
import { generateMockApyData } from "@/utils/mockApyData";
import { useState } from "react";
import { filterDataByTimeframe } from "@/utils/dateUtils";
import { useMetrics } from "@/hooks/useMetrics";
import MetricsGrid from "@/components/metrics/MetricsGrid";

const LiquidityPage = () => {
  const { data: metrics, isLoading, error } = useMetrics();
  const [volumeTimeframe, setVolumeTimeframe] = useState("7D");
  const [tvlTimeframe, setTvlTimeframe] = useState("7D");
  
  const metricsConfig = [
    {
      value: metrics?.liquidity || "$5.2M",
      label: "Total Liquidity",
      tooltip: "Total liquidity across all pools",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.volume24h || "$42.5K",
      label: "24h Volume",
      tooltip: "Trading volume in the last 24 hours",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.activeLPs || "89",
      label: "Active LPs",
      tooltip: "Number of active liquidity providers",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  // Mock data for charts
  const volumeData = generateMockApyData(40000, 45000);
  const tvlData = generateMockApyData(5000000, 5400000);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <>
      <Navbar />
      <PageWrapper title="Liquidity Analytics">
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {metricsConfig.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MetricCard {...metric} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <ChartCard 
              title="Trading Volume" 
              onTimeframeChange={setVolumeTimeframe}
            >
              <LineChartWithGradient
                data={filterDataByTimeframe(volumeData, volumeTimeframe)}
                valueFormatter={formatCurrency}
                useAreaGradient={true}
                yAxisDomain={[0, 'auto']}
              />
            </ChartCard>
          </Grid>

          <Grid item xs={12} lg={6}>
            <ChartCard 
              title="Total Value Locked" 
              onTimeframeChange={setTvlTimeframe}
            >
              <LineChartWithGradient
                data={filterDataByTimeframe(tvlData, tvlTimeframe)}
                valueFormatter={formatCurrency}
                useAreaGradient={true}
                yAxisDomain={[0, 'auto']}
              />
            </ChartCard>
          </Grid>
        </Grid>
      </PageWrapper>
    </>
  );
};

export default LiquidityPage;
