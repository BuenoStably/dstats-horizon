import { subDays, subMonths, subYears, isAfter, startOfDay, startOfWeek, startOfMonth } from "date-fns";

export const filterDataByTimeframe = (data: any[], timeframe: string) => {
  const today = new Date();
  let startDate;
  let granularity: 'hour' | 'day' | 'week' | 'month' = 'hour';

  switch (timeframe) {
    case "30D":
      startDate = subDays(today, 30);
      granularity = 'day';
      break;
    case "6M":
      startDate = subMonths(today, 6);
      granularity = 'week';
      break;
    case "1Y":
      startDate = subYears(today, 1);
      granularity = 'week';
      break;
    case "All":
      startDate = subYears(today, 2);
      granularity = 'month';
      break;
    default: // 7D
      startDate = subDays(today, 7);
      granularity = 'hour';
  }

  // Filter data points after start date
  const filteredData = data.filter(item => 
    isAfter(new Date(item.date), startDate)
  );

  // Apply granularity
  if (granularity !== 'hour') {
    const groupedData = new Map();
    
    filteredData.forEach(item => {
      const date = new Date(item.date);
      let groupKey;
      
      switch (granularity) {
        case 'day':
          groupKey = startOfDay(date).toISOString();
          break;
        case 'week':
          groupKey = startOfWeek(date).toISOString();
          break;
        case 'month':
          groupKey = startOfMonth(date).toISOString();
          break;
      }

      if (!groupedData.has(groupKey)) {
        groupedData.set(groupKey, { ...item, date: groupKey });
      } else {
        // For values that need to be averaged
        const existing = groupedData.get(groupKey);
        if (typeof existing.value === 'number') {
          existing.value = (existing.value + item.value) / 2;
        }
        // Handle special cases for different data types
        if (item.earnings !== undefined) {
          existing.earnings = (existing.earnings + item.earnings) / 2;
        }
        if (item.apy !== undefined) {
          existing.apy = (existing.apy + item.apy) / 2;
        }
        if (item.ethereumValue !== undefined) {
          existing.ethereumValue = (existing.ethereumValue + item.ethereumValue) / 2;
        }
      }
    });

    return Array.from(groupedData.values());
  }

  return filteredData;
};