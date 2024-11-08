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
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$3.00M",
      label: "Total dUSD Supply",
      tooltip: "Current total supply of dUSD in circulation",
      icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "5.39%",
      label: "Net Borrow APY",
      tooltip: "Current net borrowing annual percentage yield",
      icon: <Percent className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "50x",
      label: "Lending Rewards",
      tooltip: "Current lending reward multiplier",
      icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "50x",
      label: "LP Rewards",
      tooltip: "Current liquidity provider reward multiplier",
      icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" />,
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

const generateMockData = () => {
  const today = new Date();
  
  const generateGrowingValues = (
    startValue: number,
    daysCount: number,
    growthFactor: number,
    volatilityFactor: number,
    baselineValue: number = 0
  ) => {
    let currentValue = startValue;
    return Array.from({ length: daysCount }, (_, i) => {
      // Add significant random variations
      const randomGrowth = Math.random() * growthFactor;
      const volatility = (Math.random() - 0.5) * volatilityFactor;
      
      // Ensure overall upward trend with occasional dips
      const trend = Math.sin(i / 20) * volatilityFactor * 0.5; // Adds wave-like pattern
      currentValue = Math.max(
        baselineValue,
        currentValue * (1 + randomGrowth) + volatility + trend
      );
      
      return {
        date: new Date(today.getTime() - (daysCount - 1 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        value: currentValue,
      };
    });
  };

  const mockData = {
    tvl: generateGrowingValues(100000, 365, 0.03, 50000, 100000),
    supply: generateGrowingValues(50000, 365, 0.025, 20000, 50000),
    apy: generateGrowingValues(3, 365, 0.01, 0.5, 2).map(item => ({
      ...item,
      value: Math.min(12, item.value), // Cap APY at 12%
    })),
    users: generateGrowingValues(100, 365, 0.015, 10, 100).map(item => ({
      ...item,
      value: Math.floor(item.value), // Round to whole numbers for users
    })),
    revenue: generateGrowingValues(10000, 365, 0.02, 5000, 10000).map(item => ({
      date: item.date,
      revenue: item.value,
      percentage: Math.min(8, 2 + Math.random() * 3 + Math.sin(item.value / 10000) * 2),
    })),
  };

  return mockData;
};

const Index = () => {
  const mockData = generateMockData();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 min-h-[calc(100vh-73px)]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Key Metrics</h1>
        <MetricsSection />
        <ChartSection mockData={mockData} />
      </main>
    </div>
  );
};

export default Index;