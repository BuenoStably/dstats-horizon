import Navbar from "@/components/Navbar";
import { ChartSection } from "@/components/ChartSection";
import { DollarSign, Wallet, Percent, Gift } from "lucide-react";
import { useMetrics } from "@/hooks/useMetrics";
import { generateDusdMockData } from "@/utils/mockDusdData";
import PageWrapper from "@/components/layout/PageWrapper";
import MetricsGrid from "@/components/metrics/MetricsGrid";

const Index = () => {
  const { data: metrics, isLoading, error } = useMetrics();
  const mockData = generateDusdMockData();

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
      value: "$12.7K",
      label: "Total Rebates",
      tooltip: "Total rebates distributed to users",
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
    <>
      <Navbar />
      <PageWrapper title="Key Metrics">
        <MetricsGrid 
          metrics={metricsConfig}
          isLoading={isLoading}
          error={error instanceof Error ? error : null}
        />
        <ChartSection mockData={mockData} />
      </PageWrapper>
    </>
  );
};

export default Index;