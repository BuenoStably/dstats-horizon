export interface MetricsData {
  tvl: string;
  supply: string;
  apy: string;
  lendingRewards: string;
  lpRewards: string;
  // Liquidity page metrics
  liquidity: string;
  volume24h: string;
  activeLPs: string;
  // dLEND page metrics
  debtRatio: string;
  ltv: string;
  utilization: string;
  lenders: string;
  borrowers: string;
  // dUSD page metrics
  dusdSupply: string;
  nav: string;
  unitNav: string;
  lastPrice: string;
  holders: string;
}

export const fetchMetrics = async (): Promise<MetricsData> => {
  // Using a proper URL format without extra colon
  const response = await fetch('https://api.example.com/metrics');
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  return response.json();
};