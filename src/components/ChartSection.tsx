import { useState } from "react";
import ChartCard from "./ChartCard";
import LineChartWithGradient from "./charts/LineChartWithGradient";
import RevenueChart from "./charts/RevenueChart";
import { filterDataByTimeframe } from "@/utils/dateUtils";

interface ChartSectionProps {
  mockData: {
    tvl: any[];
    supply: any[];
    apy: any[];
    users: any[];
    revenue: any[];
  };
}

export const ChartSection = ({ mockData }: ChartSectionProps) => {
  const [tvlTimeframe, setTvlTimeframe] = useState("7D");
  const [supplyTimeframe, setSupplyTimeframe] = useState("7D");
  const [apyTimeframe, setApyTimeframe] = useState("7D");
  const [usersTimeframe, setUsersTimeframe] = useState("7D");
  const [revenueTimeframe, setRevenueTimeframe] = useState("7D");

  // Generate Ethereum TVL mock data with more natural volatility
  const generateEthereumTVL = (data: any[]) => {
    // Base value for Ethereum TVL (lower than Fraxtal)
    const baseEthValue = 3500000; // 3.5M
    let volatility = 0;
    
    return data.map((item, index) => {
      // Add some natural volatility that tends upward
      volatility += (Math.random() - 0.45) * 100000; // Slight upward bias
      // Ensure volatility doesn't get too extreme
      volatility = Math.max(Math.min(volatility, 500000), -500000);
      
      // Calculate Ethereum value with upward trend and volatility
      const trendFactor = index * 5000; // Gradual upward trend
      const ethereumValue = baseEthValue + trendFactor + volatility;
      
      return {
        ...item,
        ethereumValue: item.value + ethereumValue, // Add Fraxtal TVL to get total
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
  const formatNumber = (value: number) => value.toFixed(0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Total Protocol TVL" 
          onTimeframeChange={setTvlTimeframe}
          legend={[
            { color: "#8702ff", label: "Fraxtal TVL" },
            { color: "#22C55E", label: "Ethereum TVL" }
          ]}
        >
          <LineChartWithGradient
            data={filterDataByTimeframe(mockData.tvl, tvlTimeframe)}
            valueFormatter={formatCurrency}
            showSecondLine
            secondLineData={generateEthereumTVL(filterDataByTimeframe(mockData.tvl, tvlTimeframe))}
            secondLineKey="ethereumValue"
            secondLineColor="#22C55E"
            useAreaGradient={true}
          />
        </ChartCard>

        <ChartCard title="Total dUSD Supply" onTimeframeChange={setSupplyTimeframe}>
          <LineChartWithGradient
            data={filterDataByTimeframe(mockData.supply, supplyTimeframe)}
            valueFormatter={formatCurrency}
          />
        </ChartCard>

        <ChartCard title="Net dUSD Borrow APY" onTimeframeChange={setApyTimeframe}>
          <LineChartWithGradient
            data={filterDataByTimeframe(mockData.apy, apyTimeframe)}
            valueFormatter={formatPercentage}
          />
        </ChartCard>

        <ChartCard title="Total Users" onTimeframeChange={setUsersTimeframe}>
          <LineChartWithGradient
            data={filterDataByTimeframe(mockData.users, usersTimeframe)}
            valueFormatter={formatNumber}
          />
        </ChartCard>
      </div>

      <ChartCard 
        title="Protocol Revenue" 
        onTimeframeChange={setRevenueTimeframe}
        className="col-span-full"
      >
        <RevenueChart 
          data={filterDataByTimeframe(mockData.revenue, revenueTimeframe)}
          formatCurrency={formatCurrency}
        />
      </ChartCard>
    </div>
  );
};