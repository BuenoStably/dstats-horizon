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
      tooltip: "Total value locked across all dTrinity products, including dUSD, dLEND, and liquidity pools",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.supply || "$0",
      label: "Total dUSD Supply",
      tooltip: "Total amount of dUSD tokens currently in circulation, backed by protocol reserves",
      icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.apy || "0%",
      label: "Net Borrow APY",
      tooltip: "Current annualized percentage yield for borrowing, including all fees and rewards",
      icon: <Percent className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$12.7K",
      label: "Total Rebates",
      tooltip: "Cumulative value of rebates distributed to protocol users through various incentive programs",
      icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.lpRewards || "0x",
      label: "LP Rewards",
      tooltip: "Current multiplier for liquidity provider rewards, indicating boost in yield for LP token holders",
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