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
      color: '#22C55E',
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

    // Transform data for candlestick format
    const candleData = data.map((item, index) => {
      const timestamp = new Date(item.date).getTime() / 1000;
      const baseValue = item.value;
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
        time: timestamp as Time,
        open,
        high,
        low,
        close,
      };
    });

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