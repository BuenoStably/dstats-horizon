import { DollarSign, Users, Wallet } from "lucide-react";
import { Box, Container, Typography, Grid } from "@mui/material";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import LineChartWithGradient from "@/components/charts/LineChartWithGradient";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import RevenueChart from "@/components/charts/RevenueChart";
import CandlestickChart from "@/components/charts/CandlestickChart";
import BalanceSheetTable from "@/components/BalanceSheetTable";
import AmoTransactionsTable from "@/components/AmoTransactionsTable";
import SmoTransactionsTable from "@/components/SmoTransactionsTable";
import { generateDusdMockData } from "@/utils/mockDusdData";
import { useState } from "react";
import { filterDataByTimeframe } from "@/utils/dateUtils";

const MetricsSection = () => {
  const metrics = [
    {
      value: "$3.0M",
      label: "Total dUSD Supply",
      tooltip: "Total amount of dUSD tokens in circulation",
      icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$3.1M",
      label: "Total NAV",
      tooltip: "Net Asset Value of all dUSD tokens",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$1.0334",
      label: "Unit NAV",
      tooltip: "Net Asset Value per dUSD token",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$1.0069",
      label: "Last Price",
      tooltip: "Most recent trading price of dUSD",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "420",
      label: "dUSD Holders",
      tooltip: "Number of unique addresses holding dUSD",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
};

const DUSDPage = () => {
  const mockData = generateDusdMockData();
  const [priceTimeframe, setPriceTimeframe] = useState("7D");
  const [supplyTimeframe, setSupplyTimeframe] = useState("7D");
  const [navTimeframe, setNavTimeframe] = useState("7D");
  const [reserveRevenueTimeframe, setReserveRevenueTimeframe] = useState("7D");

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(value);

  const getSupplyDomain = () => {
    const data = filterDataByTimeframe(mockData.supply, supplyTimeframe);
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding] as [number, number];
  };

  const getNavDomain = () => {
    const amoData = filterDataByTimeframe(mockData.amoTvl, navTimeframe);
    const reserveData = filterDataByTimeframe(mockData.reserveTvl, navTimeframe);
    const secondLineKey = "value";
    const allValues = [...amoData.map(d => d.value), ...reserveData.map(d => d[secondLineKey] || 0)];
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding] as [number, number];
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Container sx={{ py: 4, minHeight: "calc(100vh - 73px)" }}>
        <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: "bold" }}>
          dUSD Analytics
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <MetricsSection />
        </Box>
        
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Grid container spacing={4}>
            <Grid container item xs={12} md={6}>
              <ChartCard title="dUSD Price (USD)" onTimeframeChange={setPriceTimeframe}>
                <CandlestickChart
                  data={filterDataByTimeframe(mockData.price, priceTimeframe)}
                  valueFormatter={formatPrice}
                />
              </ChartCard>
            </Grid>

            <Grid container item xs={12} md={6}>
              <ChartCard title="Total dUSD Supply" onTimeframeChange={setSupplyTimeframe}>
                <LineChartWithGradient
                  data={filterDataByTimeframe(mockData.supply, supplyTimeframe)}
                  valueFormatter={formatCurrency}
                  yAxisDomain={[0, 'auto']}
                  useAreaGradient={true}
                />
              </ChartCard>
            </Grid>

            <Grid container item xs={12} md={6}>
              <ChartCard 
                title="dUSD NAV" 
                onTimeframeChange={setNavTimeframe}
                legend={[
                  { color: "#4B5563", label: "AMO TVL" },
                  { color: "#22C55E", label: "Reserve TVL" }
                ]}
              >
                <LineChartWithGradient
                  data={filterDataByTimeframe(mockData.amoTvl, navTimeframe)}
                  valueFormatter={formatCurrency}
                  yAxisDomain={getNavDomain()}
                  showSecondLine
                  secondLineData={filterDataByTimeframe(mockData.reserveTvl, navTimeframe)}
                  secondLineColor="#22C55E"
                />
              </ChartCard>
            </Grid>

            <Grid container item xs={12} md={6}>
              <ChartCard 
                title="dUSD Balance Sheet"
                showTimeframes={false}
                legend={[
                  { color: "#22C55E", label: "Yieldcoins" },
                  { color: "#15803d", label: "Stablecoins" },
                  { color: "#dc2626", label: "dUSD" },
                  { color: "#4B5563", label: "Curve LP (AMO)" }
                ]}
              >
                <HorizontalBarChart
                  data={mockData.balanceSheet}
                  formatValue={formatCurrency}
                />
              </ChartCard>
            </Grid>
          </Grid>

          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, mb: 4 }}>
            <BalanceSheetTable />
          </Box>
          
          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, mb: 4 }}>
            <AmoTransactionsTable />
          </Box>
          
          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3, mb: 4 }}>
            <SmoTransactionsTable />
          </Box>
          
          <Box sx={{ bgcolor: "background.paper", borderRadius: 2, p: 3 }}>
            <ChartCard 
              title="dUSD Reserve Revenue (Yields + SMO Earnings)" 
              onTimeframeChange={setReserveRevenueTimeframe}
              legend={[
                { color: "#8702ff", label: "APY Estimate" },
                { color: "#22C55E", label: "Earnings Estimate" }
              ]}
            >
              <RevenueChart 
                data={filterDataByTimeframe(mockData.reserveRevenue, reserveRevenueTimeframe)}
                formatCurrency={formatCurrency}
              />
            </ChartCard>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default DUSDPage;