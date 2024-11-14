export const generateDusdMockData = () => {
  const price = [
    { date: "2023-01-01", value: 1.00 },
    { date: "2023-01-02", value: 1.01 },
    { date: "2023-01-03", value: 1.02 },
    { date: "2023-01-04", value: 1.03 },
    { date: "2023-01-05", value: 1.01 },
    { date: "2023-01-06", value: 1.00 },
    { date: "2023-01-07", value: 0.99 },
  ];

  const supply = [
    { date: "2023-01-01", value: 3000000 },
    { date: "2023-01-02", value: 3100000 },
    { date: "2023-01-03", value: 3200000 },
    { date: "2023-01-04", value: 3300000 },
    { date: "2023-01-05", value: 3400000 },
    { date: "2023-01-06", value: 3500000 },
    { date: "2023-01-07", value: 3600000 },
  ];

  const amoTvl = [
    { date: "2023-01-01", value: 2000000 },
    { date: "2023-01-02", value: 2050000 },
    { date: "2023-01-03", value: 2100000 },
    { date: "2023-01-04", value: 2150000 },
    { date: "2023-01-05", value: 2200000 },
    { date: "2023-01-06", value: 2250000 },
    { date: "2023-01-07", value: 2300000 },
  ];

  const reserveTvl = [
    { date: "2023-01-01", value: 1000000 },
    { date: "2023-01-02", value: 1050000 },
    { date: "2023-01-03", value: 1100000 },
    { date: "2023-01-04", value: 1150000 },
    { date: "2023-01-05", value: 1200000 },
    { date: "2023-01-06", value: 1250000 },
    { date: "2023-01-07", value: 1300000 },
  ];

  const balanceSheet = [
    { name: "Assets", value: 3100000 },
    { name: "Liabilities", value: 3000000 }
  ];

  return {
    price,
    supply,
    amoTvl,
    reserveTvl,
    balanceSheet
  };
};
