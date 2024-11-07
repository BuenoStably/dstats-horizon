import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { ChartSection } from "@/components/ChartSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coins, Wallet, Percent, Gift } from "lucide-react";

// Split the metrics data into a separate component
const MetricsSection = () => {
  const metrics = [
    {
      value: "$14.35M",
      label: "Total Protocol TVL",
      tooltip: "Total Value Locked across all protocol products",
      icon: <Coins className="w-6 h-6" />,
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
  const mockData = {
    tvl: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 14350000 + Math.random() * 1000000,
    })),
    supply: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 3000000 + Math.random() * 200000,
    })),
    apy: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 5.39 + Math.random() * 1,
    })),
    users: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 300 + i * 10 + Math.random() * 20,
    })),
    revenue: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      revenue: 50000 + Math.random() * 10000,
      percentage: (Math.random() * 2).toFixed(2),
    })),
  };
  return mockData;
};

const Index = () => {
  const mockData = generateMockData();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <MetricsSection />
        <ChartSection mockData={mockData} />
        {/* Revenue chart component would go here */}
      </main>
    </div>
  );
};

export default Index;
