import { subDays, subMonths, subYears } from "date-fns";

export const generateMockApyData = (minValue: number, maxValue: number, timeframe: string = "7D") => {
  const today = new Date();
  const data = [];
  let numberOfPoints = 0;
  let subtractFn;
  
  // Determine number of data points and date subtraction function based on timeframe
  switch (timeframe) {
    case "30D":
      numberOfPoints = 30;
      subtractFn = (date: Date, i: number) => subDays(date, i);
      break;
    case "6M":
      numberOfPoints = 180;
      subtractFn = (date: Date, i: number) => subDays(date, i);
      break;
    case "1Y":
      numberOfPoints = 365;
      subtractFn = (date: Date, i: number) => subDays(date, i);
      break;
    case "All":
      numberOfPoints = 730; // 2 years of data
      subtractFn = (date: Date, i: number) => subDays(date, i);
      break;
    default: // 7D
      numberOfPoints = 7;
      subtractFn = (date: Date, i: number) => subDays(date, i);
  }

  // Generate data points
  for (let i = numberOfPoints - 1; i >= 0; i--) {
    const date = subtractFn(today, i);
    // Generate a random value between min and max with some trend
    const trend = 1 + (Math.sin(i / 10) * 0.2); // Adds some wave pattern
    const randomValue = (minValue + Math.random() * (maxValue - minValue)) * trend;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: randomValue
    });
  }

  return data;
};