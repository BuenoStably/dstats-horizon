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
        lpRewards: "1.8x",
        // Liquidity page metrics
        liquidity: "$5.2M",
        volume24h: "$42.5K",
        activeLPs: "89",
        // dLEND page metrics
        debtRatio: "9.0",
        ltv: "80.0%",
        utilization: "90.0%",
        lenders: "268",
        borrowers: "127",
        // dUSD page metrics
        dusdSupply: "$3.0M",
        nav: "$3.1M",
        unitNav: "$1.0334",
        lastPrice: "$1.0069",
        holders: "420"
      });
    }
  });
};