export interface MetricsData {
  tvl: string;
  supply: string;
  apy: string;
  lendingRewards: string;
  lpRewards: string;
}

export const fetchMetrics = async (): Promise<MetricsData> => {
  // Using a proper URL format without extra colon
  const response = await fetch('https://api.example.com/metrics');
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  return response.json();
};