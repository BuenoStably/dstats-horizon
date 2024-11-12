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
      value: Math.max(startValue, baseValue + noise),
    };
  });
};

export const generateDusdMockData = () => {
  return {
    tvl: generateMockData(365, 2800000, 3200000),
    supply: generateMockData(365, 800000, 1800000),
    apy: generateMockData(365, 5, 15),
    users: generateMockData(365, 1000, 5000),
    revenue: generateMockData(365, 10000, 50000).map(item => ({
      ...item,
      percentage: 5 + Math.random() * 10
    }))
  };
};