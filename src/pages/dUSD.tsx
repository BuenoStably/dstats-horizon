import { DollarSign, Users, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import LineChartWithGradient from "@/components/charts/LineChartWithGradient";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
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

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 min-h-[calc(100vh-73px)]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">dUSD Analytics</h1>
        <MetricsSection />
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="dUSD Price (USD)" onTimeframeChange={setPriceTimeframe}>
              <LineChartWithGradient
                data={filterDataByTimeframe(mockData.price, priceTimeframe)}
                valueFormatter={formatPrice}
                yAxisDomain={[0.97, 1.02]}
              />
            </ChartCard>

            <ChartCard title="Total dUSD Supply" onTimeframeChange={setSupplyTimeframe}>
              <LineChartWithGradient
                data={filterDataByTimeframe(mockData.supply, supplyTimeframe)}
                valueFormatter={formatCurrency}
                color="#4B5563"
                yAxisDomain={[0, 3000000]}
              />
            </ChartCard>

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
                color="#4B5563"
                yAxisDomain={[0, 4000000]}
                showSecondLine
                secondLineData={filterDataByTimeframe(mockData.reserveTvl, navTimeframe)}
                secondLineColor="#22C55E"
              />
            </ChartCard>

            <ChartCard title="dUSD Balance Sheet">
              <div className="space-y-6">
                <HorizontalBarChart
                  data={mockData.balanceSheet.assets}
                  label="Assets"
                  formatValue={formatCurrency}
                />
                <HorizontalBarChart
                  data={mockData.balanceSheet.liabilities}
                  label="Liabilities"
                  formatValue={formatCurrency}
                />
              </div>
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DUSDPage;