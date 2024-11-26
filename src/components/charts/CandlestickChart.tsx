import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
} from "recharts";
import { format } from "date-fns";

interface CandlestickChartProps {
  data: any[];
  valueFormatter: (value: number) => string;
}

const CandlestickChart = ({
  data,
  valueFormatter,
}: CandlestickChartProps) => {
  // Process data to include candlestick information
  const processedData = data.map((item, index) => {
    const prevValue = index > 0 ? data[index - 1].value : item.value;
    const open = prevValue;
    const close = item.value;
    
    // Calculate high and low with more pronounced wicks
    // Ensure volatility is within 0.5% range for more natural price movements
    const volatilityBase = 0.005; // 0.5% base volatility
    const randomUpWick = Math.random() * volatilityBase;
    const randomDownWick = Math.random() * volatilityBase;
    
    const high = Math.max(open, close) * (1 + randomUpWick);
    const low = Math.min(open, close) * (1 - randomDownWick);
    const isUp = close > open;

    return {
      ...item,
      open,
      close,
      high,
      low,
      barHeight: Math.abs(close - open),
      color: isUp ? "#22C55E" : "#EF4444",
    };
  });

  // Calculate domain for Y axis (±10% from base price of 1.00)
  const yAxisDomain = [0.9, 1.1]; // -10% to +10%

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart 
        data={processedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(255, 255, 255, 0.1)"
        />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => format(new Date(value), "MMM d")}
          stroke="#ffffff"
          tick={{ fill: "#ffffff" }}
          tickLine={{ stroke: "#ffffff" }}
          interval={0} // Show all dates
        />
        <YAxis
          domain={yAxisDomain}
          tickFormatter={valueFormatter}
          stroke="#ffffff"
          tick={{ fill: "#ffffff" }}
          tickLine={{ stroke: "#ffffff" }}
          tickCount={10} // Increase number of ticks for better granularity
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-surface p-2 border border-white/10 rounded-lg">
                  <p className="text-white">{format(new Date(label), "MMM d, yyyy")}</p>
                  <p className="text-white">Open: {valueFormatter(data.open)}</p>
                  <p className="text-white">Close: {valueFormatter(data.close)}</p>
                  <p className="text-white">High: {valueFormatter(data.high)}</p>
                  <p className="text-white">Low: {valueFormatter(data.low)}</p>
                </div>
              );
            }
            return null;
          }}
        />
        {/* Candlestick body */}
        <Bar
          dataKey="barHeight"
          fill="color"
          stroke="color"
          barSize={8}
          stackId="stack"
          baseValue={(datum) => Math.min(datum.open, datum.close)}
        />
        {/* High wick */}
        <Line
          type="monotone"
          dataKey="high"
          stroke="color"
          dot={false}
          strokeWidth={2}
        />
        {/* Low wick */}
        <Line
          type="monotone"
          dataKey="low"
          stroke="color"
          dot={false}
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;