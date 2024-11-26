import { DollarSign, Users, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import LineChartWithGradient from "@/components/charts/LineChartWithGradient";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import ReserveRevenueChart from "@/components/charts/ReserveRevenueChart";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
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
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(value);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(value);

  // Calculate dynamic domain for supply data
  const getSupplyDomain = () => {
    const data = filterDataByTimeframe(mockData.supply, supplyTimeframe);
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  };

  // Calculate dynamic domain for NAV data
  const getNavDomain = () => {
    const amoData = filterDataByTimeframe(mockData.amoTvl, navTimeframe);
    const reserveData = filterDataByTimeframe(mockData.reserveTvl, navTimeframe);
    const allValues = [...amoData.map(d => d.value), ...reserveData.map(d => d[secondLineKey] || 0)];
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;
    return [min - padding, max + padding];
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 min-h-[calc(100vh-73px)]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">dUSD Analytics</h1>
        <MetricsSection />
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="dUSD Price (USD)" onTimeframeChange={setPriceTimeframe}>
              <CandlestickChart
                data={filterDataByTimeframe(mockData.price, priceTimeframe)}
                valueFormatter={formatPrice}
              />
            </ChartCard>

            <ChartCard title="Total dUSD Supply" onTimeframeChange={setSupplyTimeframe}>
              <LineChartWithGradient
                data={filterDataByTimeframe(mockData.supply, supplyTimeframe)}
                valueFormatter={formatCurrency}
                color="#4B5563"
                yAxisDomain={getSupplyDomain()}
              />
            </ChartCard>

            <ChartCard 
              title="dUSD NAV" 
              onTimeframeChange={setNavTimeframe}
              className="text-left"
              legend={[
                { color: "#4B5563", label: "AMO TVL" },
                { color: "#22C55E", label: "Reserve TVL" }
              ]}
            >
              <LineChartWithGradient
                data={filterDataByTimeframe(mockData.amoTvl, navTimeframe)}
                valueFormatter={formatCurrency}
                color="#4B5563"
                yAxisDomain={getNavDomain()}
                showSecondLine
                secondLineData={filterDataByTimeframe(mockData.reserveTvl, navTimeframe)}
                secondLineColor="#22C55E"
              />
            </ChartCard>

            <ChartCard 
              title="dUSD Balance Sheet"
              className="text-left"
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
          </div>

          <BalanceSheetTable />
          <AmoTransactionsTable />
          <SmoTransactionsTable />
          
          <ChartCard 
            title="dUSD Reserve Revenue (Yields + SMO Earnings)" 
            onTimeframeChange={setReserveRevenueTimeframe}
            className="col-span-full"
            legend={[
              { color: "#8702ff", label: "APY Estimate" },
              { color: "#22C55E", label: "Earnings Estimate" }
            ]}
          >
            <ReserveRevenueChart 
              data={filterDataByTimeframe(mockData.reserveRevenue, reserveRevenueTimeframe)}
              formatCurrency={formatCurrency}
            />
          </ChartCard>
        </div>
      </main>
    </div>
  );
};

export default DUSDPage;
