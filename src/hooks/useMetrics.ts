import { useQuery } from "@tanstack/react-query";
import { fetchMetrics, MetricsData } from "@/api/metrics";

export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};