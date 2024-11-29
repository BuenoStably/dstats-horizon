import { Box } from "@mui/material";
import { DollarSign, Users } from "lucide-react";
import MetricsGrid from "@/components/metrics/MetricsGrid";
import { MetricsData } from "@/api/metrics";

interface DusdMetricsProps {
  metrics: MetricsData | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const DusdMetrics = ({ metrics, isLoading, error }: DusdMetricsProps) => {
  const metricsConfig = [
    {
      value: metrics?.dusdSupply || "$0",
      label: "Total dUSD Supply",
      tooltip: "Total amount of dUSD tokens in circulation",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.nav || "$0",
      label: "Total NAV",
      tooltip: "Net Asset Value of all dUSD tokens",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.unitNav || "$0",
      label: "Unit NAV",
      tooltip: "Net Asset Value per dUSD token",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.lastPrice || "$0",
      label: "Last Price",
      tooltip: "Most recent trading price of dUSD",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: metrics?.holders || "0",
      label: "dUSD Holders",
      tooltip: "Number of unique addresses holding dUSD",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <MetricsGrid 
        metrics={metricsConfig}
        isLoading={isLoading}
        error={error}
      />
    </Box>
  );
};