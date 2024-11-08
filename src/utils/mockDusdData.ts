import { subDays } from "date-fns";

const generateMockData = (
  daysCount: number,
  startValue: number,
  endValue: number,
  volatility: number = 0.01
) => {
  const today = new Date();
  return Array.from({ length: daysCount }, (_, i) => {
    const progress = i / (daysCount - 1);
    const baseValue = startValue + (endValue - startValue) * progress;
    const noise = (Math.random() - 0.5) * 2 * volatility * baseValue;
    return {
      date: new Date(today.getTime() - (daysCount - 1 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      value: baseValue + noise,
    };
  });
};

export const generateDusdMockData = () => {
  return {
    price: generateMockData(365, 0.99, 0.999, 0.03), // Increased volatility from 0.003 to 0.03 (10x)
    supply: generateMockData(365, 2800000, 3000000),
    amoTvl: generateMockData(365, 2800000, 3200000),
    reserveTvl: generateMockData(365, 800000, 1100000),
    balanceSheet: {
      assets: [
        { name: "AMO TVL", value: 3200000 },
        { name: "Reserve TVL", value: 1100000 },
      ],
      liabilities: [
        { name: "dUSD Supply", value: 3000000 },
      ],
    },
  };
};