import { subDays } from "date-fns";

export const generateMockApyData = (minValue: number, maxValue: number) => {
  const today = new Date();
  const data = [];

  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i);
    // Generate a random value between min and max
    const randomValue = minValue + Math.random() * (maxValue - minValue);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: randomValue
    });
  }

  return data;
};