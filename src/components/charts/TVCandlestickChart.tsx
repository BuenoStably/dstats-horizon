import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, Time } from 'lightweight-charts';

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

    // Transform data for candlestick format
    const candleData = data.map((item) => {
      const volatilityBase = 0.005;
      const randomUpWick = Math.random() * volatilityBase;
      const randomDownWick = Math.random() * volatilityBase;
      
      const timestamp = new Date(item.date).getTime() / 1000;
      const open = item.value * (1 - randomDownWick);
      const close = item.value;
      const high = close * (1 + randomUpWick);
      const low = open * (1 - randomDownWick);

      return {
        time: timestamp as Time,
        open,
        high,
        low,
        close,
      };
    });

    candlestickSeries.setData(candleData);
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