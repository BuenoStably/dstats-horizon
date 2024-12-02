import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, Time, LineStyle } from 'lightweight-charts';
import { addHours, addDays, subDays, subMonths, subYears } from 'date-fns';

interface TVCandlestickChartProps {
  data: Array<{ date: string; value: number }>;
  valueFormatter: (value: number) => string;
  timeframe: string;
}

const TVCandlestickChart = ({ data, valueFormatter, timeframe }: TVCandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !data.length) return;

    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 350,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        autoScale: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
    });

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderVisible: false,
      wickUpColor: '#22C55E',
      wickDownColor: '#EF4444',
    });

    // Add horizontal line at 1.0000
    const horizontalLine = chart.addLineSeries({
      color: '#3B82F6',
      lineStyle: LineStyle.Dotted,
      lineWidth: 1,
    });

    // Set the fixed price range
    candlestickSeries.applyOptions({
      priceFormat: {
        type: 'price',
        precision: 4,
        minMove: 0.0001,
      },
    });

    // Get start date based on timeframe
    const getStartDate = () => {
      const now = new Date();
      switch (timeframe) {
        case "30D":
          return subDays(now, 30);
        case "6M":
          return subMonths(now, 6);
        case "1Y":
          return subYears(now, 1);
        default: // 7D
          return subDays(now, 7);
      }
    };

    // Get interval based on timeframe
    const getInterval = () => {
      switch (timeframe) {
        case "30D":
          return { hours: 24 }; // Daily
        case "6M":
        case "1Y":
          return { days: 15 }; // 15-day intervals
        default: // 7D
          return { hours: 2 }; // 2-hourly
      }
    };

    // Generate timestamps between start and end date
    const generateTimestamps = (startDate: Date, endDate: Date, interval: { hours?: number; days?: number }) => {
      const timestamps = [];
      let currentDate = new Date(startDate);
      
      while (currentDate <= endDate) {
        timestamps.push(new Date(currentDate));
        if (interval.hours) {
          currentDate = addHours(currentDate, interval.hours);
        } else if (interval.days) {
          currentDate = addDays(currentDate, interval.days);
        }
      }
      
      return timestamps;
    };

    // Transform and sort data for candlestick format
    const startDate = getStartDate();
    const endDate = new Date();
    const interval = getInterval();
    const timestamps = generateTimestamps(startDate, endDate, interval);

    const candleData = timestamps.map((timestamp) => {
      const baseValue = data.find(d => new Date(d.date).getTime() === timestamp.getTime())?.value || 1.0;
      const volatility = 0.002;
      const isBullish = Math.random() > 0.5;
      
      let open, close, high, low;
      
      if (isBullish) {
        open = baseValue * (1 - Math.random() * volatility);
        close = baseValue * (1 + Math.random() * volatility);
      } else {
        open = baseValue * (1 + Math.random() * volatility);
        close = baseValue * (1 - Math.random() * volatility);
      }
      
      high = Math.max(open, close) * (1 + Math.random() * volatility);
      low = Math.min(open, close) * (1 - Math.random() * volatility);

      return {
        time: Math.floor(timestamp.getTime() / 1000) as Time,
        open,
        high,
        low,
        close,
      };
    }).sort((a, b) => (a.time as number) - (b.time as number));

    candlestickSeries.setData(candleData);

    // Set horizontal line data for the entire time range
    const firstTimestamp = candleData[0].time;
    const lastTimestamp = candleData[candleData.length - 1].time;
    horizontalLine.setData([
      { time: firstTimestamp, value: 1.0000 },
      { time: lastTimestamp, value: 1.0000 },
    ]);
    
    // Set the price scale to auto-scale
    chart.priceScale('right').applyOptions({
      autoScale: true,
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
    });

    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);
    chartRef.current = chart;

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data, timeframe]);

  return <div ref={chartContainerRef} />;
};

export default TVCandlestickChart;