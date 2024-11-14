export const generateDusdMockData = () => {
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

  // Updated balance sheet structure
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