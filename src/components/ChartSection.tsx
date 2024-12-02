import { useState, useMemo } from "react";
import ChartCard from "./ChartCard";
import LineChartWithGradient from "./charts/LineChartWithGradient";
import RevenueChart from "./charts/RevenueChart";
import { filterDataByTimeframe } from "@/utils/dateUtils";
import { Box, Grid } from "@mui/material";
import HorizontalBarChart from "./charts/HorizontalBarChart";

interface ChartSectionProps {
  mockData: {
    tvl: any[];
    supply: any[];
    apy: any[];
    users: any[];
    revenue: any[];
    balanceSheet: Array<{ name: string; value: number }>;
  };
}

export const ChartSection = ({ mockData }: ChartSectionProps) => {
  const [tvlTimeframe, setTvlTimeframe] = useState("7D");
  const [supplyTimeframe, setSupplyTimeframe] = useState("7D");
  const [apyTimeframe, setApyTimeframe] = useState("7D");
  const [usersTimeframe, setUsersTimeframe] = useState("7D");
  const [revenueTimeframe, setRevenueTimeframe] = useState("7D");

  // Memoize the filtered data for each chart
  const filteredTvlData = useMemo(() => 
    filterDataByTimeframe([...mockData.tvl], tvlTimeframe),
    [mockData.tvl, tvlTimeframe]
  );

  const filteredSupplyData = useMemo(() => 
    filterDataByTimeframe([...mockData.supply], supplyTimeframe),
    [mockData.supply, supplyTimeframe]
  );

  const filteredApyData = useMemo(() => 
    filterDataByTimeframe([...mockData.apy], apyTimeframe),
    [mockData.apy, apyTimeframe]
  );

  const filteredUsersData = useMemo(() => 
    filterDataByTimeframe([...mockData.users], usersTimeframe),
    [mockData.users, usersTimeframe]
  );

  const filteredRevenueData = useMemo(() => 
    filterDataByTimeframe([...mockData.revenue], revenueTimeframe),
    [mockData.revenue, revenueTimeframe]
  );

  // Memoize the Ethereum TVL data generation
  const ethereumTVLData = useMemo(() => {
    const baseEthValue = 3500000;
    return filteredTvlData.map((item, index) => {
      const volatility = (Math.random() - 0.45) * 100000;
      const trendFactor = index * 5000;
      const ethereumValue = baseEthValue + trendFactor + volatility;
      return {
        ...item,
        ethereumValue: ethereumValue,
      };
    });
  }, [filteredTvlData]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ChartCard 
            title="Total Protocol TVL" 
            onTimeframeChange={setTvlTimeframe}
            legend={[
              { color: "#8702ff", label: "Fraxtal TVL" },
              { color: "#0EA5E9", label: "Ethereum TVL" }
            ]}
          >
            <LineChartWithGradient
              data={filteredTvlData}
              valueFormatter={formatCurrency}
              yAxisFormatter={formatCurrency}
              showSecondLine
              secondLineData={ethereumTVLData}
              secondLineKey="ethereumValue"
              secondLineColor="#0EA5E9"
              useAreaGradient={true}
              yAxisDomain={[0, 'auto']}
              mainLineLabel="Fraxtal TVL"
              secondLineLabel="Ethereum TVL"
            />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6}>
          <ChartCard 
            title="Total dUSD Supply" 
            onTimeframeChange={setSupplyTimeframe}
          >
            <LineChartWithGradient
              data={filteredSupplyData}
              valueFormatter={formatCurrency}
              yAxisFormatter={formatCurrency}
              useAreaGradient={true}
              yAxisDomain={[0, 'auto']}
              mainLineLabel="Total dUSD Supply"
            />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6}>
          <ChartCard 
            title="Net dUSD Borrow APY" 
            onTimeframeChange={setApyTimeframe}
          >
            <LineChartWithGradient
              data={filteredApyData}
              valueFormatter={formatPercentage}
              yAxisFormatter={formatPercentage}
              useAreaGradient={false}
              yAxisDomain={[0, 'auto']}
              mainLineLabel="Net dUSD Borrow APY"
            />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6}>
          <ChartCard 
            title="Total Users" 
            onTimeframeChange={setUsersTimeframe}
          >
            <LineChartWithGradient
              data={filteredUsersData}
              valueFormatter={formatNumber}
              yAxisFormatter={formatNumber}
              useAreaGradient={true}
              yAxisDomain={[0, 'auto']}
              mainLineLabel="Total Users"
            />
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
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
              yAxisWidth={60}
            />
          </ChartCard>
        </Grid>

        <Grid item xs={12}>
          <ChartCard 
            title="Protocol Revenue" 
            onTimeframeChange={setRevenueTimeframe}
          >
            <RevenueChart 
              data={filteredRevenueData}
              formatCurrency={formatCurrency}
            />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};
