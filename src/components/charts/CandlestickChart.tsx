import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  ReferenceLine
} from "recharts";
import { format } from "date-fns";

interface CandlestickChartProps {
  data: any[];
  valueFormatter: (value: number) => string;
  yAxisDomain?: number[];
}

const CandlestickChart = ({
  data,
  valueFormatter,
  yAxisDomain,
}: CandlestickChartProps) => {
  // Process data to include candlestick information
  const processedData = data.map((item, index) => {
    const prevValue = index > 0 ? data[index - 1].value : item.value;
    const open = prevValue;
    const close = item.value;
    const high = Math.max(open, close) + (Math.random() * 0.002); // Simulate high
    const low = Math.min(open, close) - (Math.random() * 0.002);  // Simulate low
    const isUp = close >= open;
    
    return {
      ...item,
      open,
      close,
      high,
      low,
      isUp
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={processedData}>
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
        />
        <YAxis
          domain={yAxisDomain || ["auto", "auto"]}
          tickFormatter={valueFormatter}
          stroke="#ffffff"
          tick={{ fill: "#ffffff" }}
          tickLine={{ stroke: "#ffffff" }}
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
        {/* Draw candlestick wicks */}
        {processedData.map((entry, index) => (
          <Line
            key={`wick-${index}`}
            data={[{ date: entry.date, value: entry.low }, { date: entry.date, value: entry.high }]}
            type="linear"
            dataKey="value"
            stroke={entry.isUp ? "#22C55E" : "#EF4444"}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        ))}
        {/* Draw candlestick bodies */}
        {processedData.map((entry, index) => (
          <ReferenceLine
            key={`body-${index}`}
            segment={[
              { x: entry.date, y: entry.open },
              { x: entry.date, y: entry.close }
            ]}
            stroke={entry.isUp ? "#22C55E" : "#EF4444"}
            strokeWidth={8}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;