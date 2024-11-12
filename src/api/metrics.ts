export interface MetricsData {
  tvl: string;
  supply: string;
  apy: string;
  lendingRewards: string;
  lpRewards: string;
}

export const fetchMetrics = async (): Promise<MetricsData> => {
  // Replace this URL with your actual API endpoint
  const response = await fetch('https://api.example.com/metrics');
  if (!response.ok) {
    throw new Error('Failed to fetch metrics');
  }
  return response.json();
};