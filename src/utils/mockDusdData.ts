export interface DusdMockData {
  price: Array<{ date: string; value: number }>;
  supply: Array<{ date: string; value: number }>;
  amoTvl: Array<{ date: string; value: number }>;
  reserveTvl: Array<{ date: string; value: number }>;
  balanceSheet: Array<{ name: string; value: number }>;
  tvl: Array<{ date: string; value: number }>;
  apy: Array<{ date: string; value: number }>;
  users: Array<{ date: string; value: number }>;
  revenue: Array<{ date: string; value: number }>;
  reserveRevenue: Array<{
    date: string;
    earnings: number;
    apy: number;
  }>;
}

export const generateDusdMockData = (): DusdMockData => {
  // Generate dates for the last 365 days
  const dates = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    return date.toISOString().split('T')[0];
  });

  // Generate price data with natural volatility around 1.00
  const price = dates.reduce((acc, date, i) => {
    const prevPrice = i > 0 ? acc[i - 1].value : 1.00;
    
    // Create more natural price movements
    const trend = Math.sin(i / 30) * 0.0002; // Slight cyclical trend
    const dailyVolatility = (Math.random() - 0.5) * 0.002; // Random daily movement
    const momentum = i > 0 ? (acc[i - 1].value - (i > 1 ? acc[i - 2].value : 1.00)) * 0.2 : 0; // Price momentum
    
    // Calculate new price with mean reversion to 1.00
    const meanReversion = (1.00 - prevPrice) * 0.01;
    const newPrice = prevPrice + trend + dailyVolatility + momentum + meanReversion;
    
    // Ensure price stays within reasonable bounds (0.98 - 1.02)
    const boundedPrice = Math.max(0.98, Math.min(1.02, newPrice));
    
    acc.push({
      date,
      value: boundedPrice
    });
    
    return acc;
  }, [] as Array<{ date: string; value: number }>);

  // Generate TVL data (growing trend from 4.8M to 5.2M)
  const tvl = dates.map((date, i) => ({
    date,
    value: 4800000 + (i * (400000 / 365)) + (Math.random() * 50000)
  }));

  // Generate supply data (growing trend from 2.8M to 3.0M)
  const supply = dates.map((date, i) => ({
    date,
    value: 2800000 + (i * (200000 / 365)) + (Math.random() * 50000)
  }));

  // Generate APY data (fluctuating between 4% and 6%)
  const apy = dates.map(date => ({
    date,
    value: 4 + (Math.random() * 2)
  }));

  // Generate users data (growing from 900 to 1000)
  const users = dates.map((date, i) => ({
    date,
    value: 900 + Math.floor((i * 100) / 365) + Math.floor(Math.random() * 10)
  }));

  // Generate revenue data
  const revenue = dates.map((date, i) => ({
    date,
    value: 45000 + (i * (180000 / 365)) + (Math.random() * 5000),
    revenueTvl: 45000 + (i * (180000 / 365)) + (Math.random() * 5000),
    annualizedRevenue: 0.15 + (Math.random() * 0.05)
  }));

  // Generate AMO TVL data (around 2M with fluctuations)
  const amoTvl = dates.map((date, i) => ({
    date,
    value: 2000000 + (i * (100000 / 365)) + (Math.random() * 100000 - 50000)
  }));

  // Generate Reserve TVL data (around 1M with fluctuations)
  const reserveTvl = dates.map((date, i) => ({
    date,
    value: 1000000 + (i * (50000 / 365)) + (Math.random() * 100000 - 50000)
  }));

  // Generate reserve revenue data with more natural progression
  const reserveRevenue = dates.map((date, i) => {
    // APY starts at 45% and gradually decreases to 4.2% with some volatility
    const progress = i / dates.length;
    const baseApy = 0.45 - (0.408 * progress);
    const volatility = 0.02 * Math.sin(i / 30) + (Math.random() * 0.01 - 0.005);
    const apy = Math.max(0.042, baseApy + volatility);
    
    // Earnings fluctuate between $250 and $1,250 with a slight upward trend
    const baseEarnings = 250 + (1000 * progress);
    const earnings = baseEarnings + (Math.random() * 200 - 100);

    return {
      date,
      earnings,
      apy
    };
  });

  const balanceSheet = [
    { name: "Assets", value: 3100000 },
    { name: "Liabilities", value: 3000000 }
  ];

  return {
    price,
    supply,
    amoTvl,
    reserveTvl,
    balanceSheet,
    tvl,
    apy,
    users,
    revenue,
    reserveRevenue
  };
};
