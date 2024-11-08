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
    targetValue: number,
    daysCount: number,
    growthFactor: number,
    volatilityFactor: number,
    baselineValue: number = 0
  ) => {
    return Array.from({ length: daysCount }, (_, i) => {
      const progress = i / daysCount;
      
      // Start very close to zero and grow exponentially towards target
      const baseGrowth = targetValue * Math.pow(progress, growthFactor);
      
      // Minimal volatility that doesn't affect the trend
      const noise = (Math.random() - 0.5) * volatilityFactor * progress * 0.01;
      
      // Ensure value never goes below baseline and maintains upward trend
      const value = Math.max(
        baselineValue,
        baseGrowth + noise
      );

      return {
        date: new Date(today.getTime() - (daysCount - 1 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
        value: value,
      };
    });
  };

  const mockData = {
    tvl: generateGrowingValues(14350000, 365, 3, 10000),
    supply: generateGrowingValues(3000000, 365, 3, 5000),
    apy: generateGrowingValues(5.39, 365, 2, 0.1).map(item => ({
      ...item,
      value: Math.max(2, Math.min(12, item.value)),
    })),
    users: generateGrowingValues(1000, 365, 3, 2).map(item => ({
      ...item,
      value: Math.floor(item.value),
    })),
    revenue: generateGrowingValues(100000, 365, 3, 1000).map(item => ({
      date: item.date,
      revenue: item.value,
      percentage: Math.min(8, 2 + (item.value / 100000)),
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
