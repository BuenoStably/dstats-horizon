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
    return Array.from({ length: daysCount }, (_, i) => {
      const progress = i / daysCount;
      
      // Create exponential growth curve
      const baseGrowth = startValue * Math.pow(1 + growthFactor, progress);
      
      // Add natural variations
      const wave = Math.sin(progress * Math.PI * 2) * volatilityFactor * progress;
      const noise = (Math.random() - 0.5) * volatilityFactor * progress * 0.5;
      
      // Ensure value never goes below baseline
      const value = Math.max(
        baselineValue,
        baseGrowth + wave + noise
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
    tvl: generateGrowingValues(1000000, 365, 1.5, 200000),
    supply: generateGrowingValues(300000, 365, 1.2, 100000),
    apy: generateGrowingValues(2, 365, 0.5, 0.8).map(item => ({
      ...item,
      value: Math.min(12, Math.max(2, item.value)),
    })),
    users: generateGrowingValues(100, 365, 1.8, 50).map(item => ({
      ...item,
      value: Math.floor(item.value),
    })),
    revenue: generateGrowingValues(50000, 365, 1.4, 20000).map(item => ({
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
