import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
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
    const isUp = item.value >= prevValue;
    
    return {
      ...item,
      color: isUp ? "#22C55E" : "#EF4444", // green for up, red for down
      value: Math.abs(item.value - prevValue), // height of the candle
      base: Math.min(item.value, prevValue), // starting point of the candle
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
              const currentValue = payload[0].payload.value + payload[0].payload.base;
              return (
                <div className="bg-surface p-2 border border-white/10 rounded-lg">
                  <p className="text-white">{format(new Date(label), "MMM d, yyyy")}</p>
                  <p className="text-white">Price: {valueFormatter(currentValue)}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="value"
          fill="currentColor"
          stroke="currentColor"
          className="[fill:var(--candlestick-color)] [stroke:var(--candlestick-color)]"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;