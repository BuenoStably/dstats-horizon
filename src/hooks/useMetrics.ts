import { useQuery } from "@tanstack/react-query";
import { fetchMetrics } from "@/api/metrics";

export const useMetrics = () => {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: () => {
      // Mock data for development
      return Promise.resolve({
        tvl: "$5.2M",
        supply: "$3.0M",
        apy: "4.8%",
        lendingRewards: "2.5x",
        lpRewards: "1.8x"
      });
    }
  });
};