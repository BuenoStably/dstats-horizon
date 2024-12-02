import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, Time, LineStyle } from 'lightweight-charts';

interface TVCandlestickChartProps {
  data: Array<{ date: string; value: number }>;
  valueFormatter: (value: number) => string;
}

const TVCandlestickChart = ({ data, valueFormatter }: TVCandlestickChartProps) => {
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
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleDateString('en-US', { 
            month: 'short',
            day: 'numeric'
          });
        },
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

    // Transform and sort data for candlestick format
    // Group data points by day to reduce granularity
    const groupedData = new Map();
    
    data.forEach((item) => {
      const date = new Date(item.date);
      const dayKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
      
      if (!groupedData.has(dayKey)) {
        groupedData.set(dayKey, {
          values: [item.value],
          timestamp: Math.floor(dayKey / 1000),
        });
      } else {
        groupedData.get(dayKey).values.push(item.value);
      }
    });

    const candleData = Array.from(groupedData.values()).map(({ values, timestamp }) => {
      const dayValues = values.sort((a, b) => a - b);
      const volatility = 0.001; // Reduced volatility
      
      const open = dayValues[0];
      const close = dayValues[dayValues.length - 1];
      const high = Math.max(...dayValues) * (1 + volatility);
      const low = Math.min(...dayValues) * (1 - volatility);

      return {
        time: timestamp as Time,
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
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default TVCandlestickChart;