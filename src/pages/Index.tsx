import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { ChartSection } from "@/components/ChartSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DollarSign, Wallet, Percent, Gift } from "lucide-react";
import { useMetrics } from "@/hooks/useMetrics";

const MetricsSection = () => {
  const { data: metrics, isLoading, error } = useMetrics();

  const metricsConfig = [
    {
      value: metrics?.tvl || "$0",
      label: "Total Protocol TVL",
      tooltip: "Total Value Locked across all protocol products",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.supply || "$0",
      label: "Total dUSD Supply",
      tooltip: "Current total supply of dUSD in circulation",
      icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.apy || "0%",
      label: "Net Borrow APY",
      tooltip: "Current net borrowing annual percentage yield",
      icon: <Percent className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.lendingRewards || "0x",
      label: "Lending Rewards",
      tooltip: "Current lending reward multiplier",
      icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.lpRewards || "0x",
      label: "LP Rewards",
      tooltip: "Current liquidity provider reward multiplier",
      icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {metricsConfig.map((metric, index) => (
        <MetricCard 
          key={index} 
          {...metric} 
          isLoading={isLoading}
          error={error instanceof Error ? error : null}
        />
      ))}
    </div>
  );
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