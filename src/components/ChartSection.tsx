import { useState } from "react";
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

  const generateEthereumTVL = (data: any[]) => {
    const baseEthValue = 3500000;
    let volatility = 0;

    return data.map((item, index) => {
      volatility += (Math.random() - 0.45) * 100000;
      volatility = Math.max(Math.min(volatility, 500000), -500000);
      const trendFactor = index * 5000;
      const ethereumValue = baseEthValue + trendFactor + volatility;
      return {
        ...item,
        ethereumValue: ethereumValue,
      };
    });
  };

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
        <Grid item xs={12} lg={6} container>
          <ChartCard 
            title="Total Protocol TVL" 
            onTimeframeChange={setTvlTimeframe}
            legend={[
              { color: "#8702ff", label: "Fraxtal TVL" },
              { color: "#0EA5E9", label: "Ethereum TVL" }
            ]}
            className="flex flex-col"
          >
            <LineChartWithGradient
              data={filterDataByTimeframe(mockData.tvl, tvlTimeframe)}
              valueFormatter={formatCurrency}
              yAxisFormatter={formatCurrency}
              showSecondLine
              secondLineData={generateEthereumTVL(filterDataByTimeframe(mockData.tvl, tvlTimeframe))}
              secondLineKey="ethereumValue"
              secondLineColor="#0EA5E9"
              useAreaGradient={true}
              yAxisDomain={[0, 'auto']}
              mainLineLabel="Fraxtal TVL"
              secondLineLabel="Ethereum TVL"
            />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6} container>
          <ChartCard title="Total dUSD Supply" onTimeframeChange={setSupplyTimeframe}>
            <LineChartWithGradient
              data={filterDataByTimeframe(mockData.supply, supplyTimeframe)}
              valueFormatter={formatCurrency}
              yAxisFormatter={formatCurrency}
              useAreaGradient={true}
              yAxisDomain={[0, 'auto']}
              mainLineLabel="Total dUSD Supply"
            />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6} container>
          <ChartCard title="Net dUSD Borrow APY" onTimeframeChange={setApyTimeframe}>
            <LineChartWithGradient
              data={filterDataByTimeframe(mockData.apy, apyTimeframe)}
              valueFormatter={formatPercentage}
              yAxisFormatter={formatPercentage}
              useAreaGradient={false}
              yAxisDomain={[0, 'auto']}
              mainLineLabel="Net dUSD Borrow APY"
            />
          </ChartCard>
        </Grid>

        <Grid item xs={12} lg={6} container>
          <ChartCard title="Total Users" onTimeframeChange={setUsersTimeframe}>
            <LineChartWithGradient
              data={filterDataByTimeframe(mockData.users, usersTimeframe)}
              valueFormatter={formatNumber}
              yAxisFormatter={formatNumber}
              useAreaGradient={true}
              yAxisDomain={[0, 'auto']}
              mainLineLabel="Total Users"
            />
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} container>
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
      </Grid>

      <Grid container>
        <Grid item xs={12} container>
          <ChartCard 
            title="Protocol Revenue" 
            onTimeframeChange={setRevenueTimeframe}
          >
            <RevenueChart 
              data={filterDataByTimeframe(mockData.revenue, revenueTimeframe)}
              formatCurrency={formatCurrency}
            />
          </ChartCard>
        </Grid>
      </Grid>
    </Box>
  );
};
