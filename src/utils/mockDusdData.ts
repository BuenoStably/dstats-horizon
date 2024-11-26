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
  // Generate dates for the last 30 days
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  // Generate price data with natural volatility around 1.00
  const price = dates.map(date => {
    const randomVolatility = (Math.random() - 0.5) * 0.005; // ±0.25% daily volatility
    return {
      date,
      value: 1.00 + randomVolatility
    };
  });

  // Generate TVL data (growing trend from 4.8M to 5.2M)
  const tvl = dates.map((date, i) => ({
    date,
    value: 4800000 + (i * 13333) + (Math.random() * 50000)
  }));

  // Generate supply data (growing trend from 2.8M to 3.0M)
  const supply = dates.map((date, i) => ({
    date,
    value: 2800000 + (i * 7000) + (Math.random() * 50000)
  }));

  // Generate APY data (fluctuating between 4% and 6%)
  const apy = dates.map(date => ({
    date,
    value: 4 + (Math.random() * 2)
  }));

  // Generate users data (growing from 900 to 1000)
  const users = dates.map((date, i) => ({
    date,
    value: 900 + Math.floor(i * 3.33) + Math.floor(Math.random() * 10)
  }));

  // Generate revenue data
  const revenue = dates.map((date, i) => ({
    date,
    value: 45000 + (i * 500) + (Math.random() * 5000),
    revenueTvl: 45000 + (i * 500) + (Math.random() * 5000),
    annualizedRevenue: 0.15 + (Math.random() * 0.05)
  }));

  // Generate AMO TVL data (around 2M with fluctuations)
  const amoTvl = dates.map(date => ({
    date,
    value: 2000000 + (Math.random() * 100000 - 50000)
  }));

  // Generate Reserve TVL data (around 1M with fluctuations)
  const reserveTvl = dates.map(date => ({
    date,
    value: 1000000 + (Math.random() * 100000 - 50000)
  }));

  // Generate reserve revenue data
  const reserveRevenue = dates.map((date, i) => {
    // APY starts at 45% and gradually decreases to 4.2% with some volatility
    const baseApy = 0.45 - (i * 0.014);
    const apy = Math.max(0.042, baseApy + (Math.random() * 0.05 - 0.025));
    
    // Earnings fluctuate between $250 and $1,250
    const earnings = 250 + Math.random() * 1000;

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
