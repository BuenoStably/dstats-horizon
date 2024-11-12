import { subDays, subMonths, subYears } from "date-fns";

export const getDateRange = (timeframe: string): Date => {
  const today = new Date();
  
  switch (timeframe) {
    case "7D":
      return subDays(today, 7);
    case "30D":
      return subDays(today, 30);
    case "6M":
      return subMonths(today, 6);
    case "1Y":
      return subYears(today, 1);
    case "All":
      return new Date(2024, 0, 1); // Returns January 1st, 2024 as the start date
    default:
      return subDays(today, 7);
  }
};

export const filterDataByTimeframe = (data: any[] | undefined, timeframe: string) => {
  if (!data) return [];
  const startDate = getDateRange(timeframe);
  return data.filter(item => new Date(item.date) >= startDate);
};