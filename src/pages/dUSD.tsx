import { DollarSign, Users } from "lucide-react";
import { Box, Grid, Typography } from "@mui/material";
import ChartCard from "@/components/ChartCard";
import LineChartWithGradient from "@/components/charts/LineChartWithGradient";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import ReserveRevenueChart from "@/components/charts/ReserveRevenueChart";
import TVCandlestickChart from "@/components/charts/TVCandlestickChart";
import BalanceSheetTable from "@/components/BalanceSheetTable";
import AmoTransactionsTable from "@/components/AmoTransactionsTable";
import SmoTransactionsTable from "@/components/SmoTransactionsTable";
import TableWrapper from "@/components/TableWrapper";
import { generateDusdMockData } from "@/utils/mockDusdData";
import { useState, useMemo } from "react";
import { filterDataByTimeframe } from "@/utils/dateUtils";
import { useMetrics } from "@/hooks/useMetrics";
import MetricsGrid from "@/components/metrics/MetricsGrid";
import PageWrapper from "@/components/layout/PageWrapper";

const DUSDPage = () => {
  const { data: metrics, isLoading, error } = useMetrics();
  const [priceTimeframe, setPriceTimeframe] = useState("7D");
  const [supplyTimeframe, setSupplyTimeframe] = useState("7D");
  const [navTimeframe, setNavTimeframe] = useState("7D");
  const [revenueTimeframe, setRevenueTimeframe] = useState("7D");

  // Memoize mock data generation
  const mockData = useMemo(() => generateDusdMockData(), []);

  // Memoize filtered data for each chart
  const filteredPriceData = useMemo(
    () => filterDataByTimeframe(mockData.price, priceTimeframe),
    [mockData.price, priceTimeframe]
  );

  const filteredSupplyData = useMemo(
    () => filterDataByTimeframe(mockData.supply, supplyTimeframe),
    [mockData.supply, supplyTimeframe]
  );

  const filteredNavAmoData = useMemo(
    () => filterDataByTimeframe(mockData.amoTvl, navTimeframe),
    [mockData.amoTvl, navTimeframe]
  );

  const filteredNavReserveData = useMemo(
    () => filterDataByTimeframe(mockData.reserveTvl, navTimeframe),
    [mockData.reserveTvl, navTimeframe]
  );

  const filteredRevenueData = useMemo(
    () => filterDataByTimeframe(mockData.reserveRevenue, revenueTimeframe),
    [mockData.reserveRevenue, revenueTimeframe]
  );

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

  const getNavDomain = (): [number, number] => {
    const values = [...mockData.amoTvl, ...mockData.reserveTvl].map(item => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = (maxValue - minValue) * 0.1;
    return [minValue - padding, maxValue + padding];
  };

  return (
    <PageWrapper title="dUSD Analytics">
      <Box sx={{ mb: 4 }}>
        <MetricsGrid 
          metrics={[
            {
              value: metrics?.dusdSupply || "$3.0M",
              label: "Total dUSD Supply",
              tooltip: "Total amount of dUSD tokens in circulation",
              icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
            },
            {
              value: metrics?.nav || "$3.1M",
              label: "Total NAV",
              tooltip: "Net Asset Value of all dUSD tokens",
              icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
            },
            {
              value: metrics?.unitNav || "$1.0334",
              label: "Unit NAV",
              tooltip: "Net Asset Value per dUSD token",
              icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
            },
            {
              value: metrics?.lastPrice || "$1.0069",
              label: "Last Price",
              tooltip: "Most recent trading price of dUSD",
              icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
            },
            {
              value: metrics?.holders || "420",
              label: "dUSD Holders",
              tooltip: "Number of unique addresses holding dUSD",
              icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
            },
          ]}
          isLoading={isLoading}
          error={error instanceof Error ? error : null}
        />
      </Box>
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <Grid container spacing={4}>
          <Grid container item xs={12} md={6}>
            <ChartCard title="dUSD Price (USD)" onTimeframeChange={setPriceTimeframe}>
              <TVCandlestickChart
                data={filteredPriceData}
                valueFormatter={formatPrice}
                timeframe={priceTimeframe}
              />
            </ChartCard>
          </Grid>

          <Grid container item xs={12} md={6}>
            <ChartCard title="Total dUSD Supply" onTimeframeChange={setSupplyTimeframe}>
              <LineChartWithGradient
                data={filteredSupplyData}
                valueFormatter={formatCurrency}
                yAxisDomain={[0, 'auto']}
                useAreaGradient={true}
                mainLineLabel="Total Supply"
              />
            </ChartCard>
          </Grid>

          <Grid container item xs={12} md={6}>
            <ChartCard 
              title="dUSD NAV" 
              onTimeframeChange={setNavTimeframe}
              legend={[
                { color: "#8702ff", label: "AMO TVL" },
                { color: "#22C55E", label: "Reserve TVL" }
              ]}
            >
              <LineChartWithGradient
                data={filteredNavAmoData}
                valueFormatter={formatCurrency}
                yAxisDomain={getNavDomain()}
                showSecondLine
                secondLineData={filteredNavReserveData}
                secondLineColor="#22C55E"
                mainLineLabel="AMO TVL"
                secondLineLabel="Reserve TVL"
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

        <TableWrapper>
          <BalanceSheetTable />
        </TableWrapper>
        
        <TableWrapper>
          <AmoTransactionsTable />
        </TableWrapper>
        
        <TableWrapper>
          <SmoTransactionsTable />
        </TableWrapper>
        
        <TableWrapper>
          <ChartCard 
            title="dUSD Reserve Revenue (Yields + SMO Earnings)" 
            onTimeframeChange={setRevenueTimeframe}
            legend={[
              { color: "#8702ff", label: "APY Estimate" },
              { color: "#22C55E", label: "Earnings Estimate" }
            ]}
          >
            <ReserveRevenueChart 
              data={filteredRevenueData}
              formatCurrency={formatCurrency}
            />
          </ChartCard>
        </TableWrapper>
      </Box>
    </PageWrapper>
  );
};

export default DUSDPage;
