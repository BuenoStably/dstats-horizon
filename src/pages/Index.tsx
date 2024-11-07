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
  const mockData = {
    tvl: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 10000000 + (i * 25000) + (Math.random() * 500000), // Steady growth from 10M with some variance
    })),
    supply: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 2000000 + (i * 5000) + (Math.random() * 100000), // Steady growth from 2M
    })),
    apy: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 4 + (i * 0.01) + (Math.random() * 0.5), // Gradual APY increase
    })),
    users: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 100 + (i * 2) + Math.floor(Math.random() * 10), // Linear user growth
    })),
    revenue: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      revenue: 30000 + (i * 100) + (Math.random() * 5000), // Growing revenue
      percentage: 2 + (i * 0.01) + (Math.random() * 0.5), // Growing percentage
    })),
  };
  return mockData;
};

const Index = () => {
  const mockData = generateMockData();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8 bg-[#161616] min-h-[calc(100vh-73px)] rounded-t-3xl">
        <h1 className="text-2xl font-bold mb-6">Key Metrics</h1>
        <MetricsSection />
        <ChartSection mockData={mockData} />
      </main>
    </div>
  );
};

export default Index;