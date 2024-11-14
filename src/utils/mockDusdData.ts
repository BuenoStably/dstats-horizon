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
}

export const generateDusdMockData = (): DusdMockData => {
  // Generate dates for the last 30 days
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  // Generate price data (fluctuating around 1.00)
  const price = dates.map(date => ({
    date,
    value: 1 + (Math.random() * 0.02 - 0.01) // Random value between 0.99 and 1.01
  }));

  // Generate supply data (growing trend from 2.8M to 3.0M)
  const supply = dates.map((date, i) => ({
    date,
    value: 2800000 + (i * 7000) + (Math.random() * 50000)
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

  const balanceSheet = [
    { name: "Assets", value: 3100000 },
    { name: "Liabilities", value: 3000000 }
  ];

  // Add missing required data
  const tvl = [
    { date: "2023-11-01", value: 5000000 },
    { date: "2023-11-30", value: 5150000 }
  ];

  const apy = [
    { date: "2023-11-01", value: 0.05 },
    { date: "2023-11-30", value: 0.055 }
  ];

  const users = [
    { date: "2023-11-01", value: 1000 },
    { date: "2023-11-30", value: 1200 }
  ];

  const revenue = [
    { date: "2023-11-01", value: 50000 },
    { date: "2023-11-30", value: 55000 }
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
    revenue
  };
};