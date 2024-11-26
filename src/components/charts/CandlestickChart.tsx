import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar
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
    const high = Math.max(open, close) + (Math.random() * 0.002);
    const low = Math.min(open, close) - (Math.random() * 0.002);
    const isUp = close > open;
    
    return {
      ...item,
      open,
      close,
      high,
      low,
      value: close - open, // For bar height
      color: isUp ? "#22C55E" : "#EF4444"
    };
  });

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
          interval={0}
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
        <Bar
          dataKey="value"
          fill={(data) => data.color}
          stroke={(data) => data.color}
          barSize={6}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;