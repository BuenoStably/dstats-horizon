export const filterDataByTimeframe = (data: any[], timeframe: string) => {
  if (!data || data.length === 0) return [];
  
  const now = new Date();
  const startDate = new Date();
  
  switch (timeframe) {
    case "7D":
      startDate.setDate(now.getDate() - 7);
      break;
    case "30D":
      startDate.setDate(now.getDate() - 30);
      break;
    case "6M":
      startDate.setMonth(now.getMonth() - 6);
      break;
    case "1Y":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    case "All":
      return data;
    default:
      startDate.setDate(now.getDate() - 7);
  }
  
  return data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= now;
  });
};