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
  const price = [
    { date: "2023-11-01", value: 1.00 },
    { date: "2023-11-30", value: 1.01 }
  ];

  const supply = [
    { date: "2023-11-01", value: 3000000 },
    { date: "2023-11-30", value: 3100000 }
  ];

  const amoTvl = [
    { date: "2023-11-01", value: 2000000 },
    { date: "2023-11-30", value: 2050000 }
  ];

  const reserveTvl = [
    { date: "2023-11-01", value: 1000000 },
    { date: "2023-11-30", value: 1050000 }
  ];

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