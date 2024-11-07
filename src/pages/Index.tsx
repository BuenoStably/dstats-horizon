import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { ChartSection } from "@/components/ChartSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DollarSign, Wallet, Percent, Gift } from "lucide-react";

const MetricsSection = () => {
  const metrics = [
    {
      value: "$14.35M",
      label: "Total Protocol TVL",
      tooltip: "Total Value Locked across all protocol products",
      icon: <DollarSign className="w-6 h-6" />,
    },
    {
      value: "$3.00M",
      label: "Total dUSD Supply",
      tooltip: "Current total supply of dUSD in circulation",
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      value: "5.39%",
      label: "Net Borrow APY",
      tooltip: "Current net borrowing annual percentage yield",
      icon: <Percent className="w-6 h-6" />,
    },
    {
      value: "50x",
      label: "Lending Rewards",
      tooltip: "Current lending reward multiplier",
      icon: <Gift className="w-6 h-6" />,
    },
    {
      value: "50x",
      label: "LP Rewards",
      tooltip: "Current liquidity provider reward multiplier",
      icon: <Gift className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

const generateMockData = () => {
  const today = new Date();
  
  // Helper function to generate growing values with natural variations
  const generateGrowingValues = (
    startValue: number,
    daysCount: number,
    dailyGrowthMin: number,
    dailyGrowthMax: number,
    volatility: number
  ) => {
    let currentValue = startValue;
    return Array.from({ length: daysCount }, (_, i) => {
      // Calculate daily growth with random variation
      const dailyGrowth = 
        Math.random() * (dailyGrowthMax - dailyGrowthMin) + dailyGrowthMin;
      
      // Add some volatility
      const variation = (Math.random() - 0.5) * volatility;
      
      // Ensure value never goes below zero and grows over time
      currentValue = Math.max(0, currentValue + (currentValue * dailyGrowth) + variation);
      
      return {
        date: new Date(today.getTime() - (daysCount - 1 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        value: currentValue,
      };
    });
  };

  const mockData = {
    tvl: generateGrowingValues(0, 365, 0.001, 0.003, 50000),
    supply: generateGrowingValues(0, 365, 0.001, 0.002, 10000),
    apy: generateGrowingValues(0, 365, 0.0001, 0.0003, 0.1),
    users: generateGrowingValues(0, 365, 0.002, 0.004, 2).map(item => ({
      ...item,
      value: Math.floor(item.value), // Round to whole numbers for users
    })),
    revenue: generateGrowingValues(0, 365, 0.001, 0.003, 1000).map(item => ({
      date: item.date,
      revenue: item.value,
      percentage: (Math.random() * 2) + 3, // Random percentage between 3-5%
    })),
  };

  return mockData;
};

const Index = () => {
  const mockData = generateMockData();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8 min-h-[calc(100vh-73px)]">
        <h1 className="text-2xl font-bold mb-6">Key Metrics</h1>
        <MetricsSection />
        <ChartSection mockData={mockData} />
      </main>
    </div>
  );
};

export default Index;