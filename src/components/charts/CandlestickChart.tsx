import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  ReferenceLine
} from "recharts";
import { format } from "date-fns";

interface CandlestickChartProps {
  data: any[];
  valueFormatter: (value: number) => string;
  yAxisDomain?: number[];
}

interface ProcessedDataPoint {
  date: string;
  value: number;
  open: number;
  close: number;
  high: number;
  low: number;
  fill: string;
  stroke: string;
  wickColor: string;
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
    
    // Calculate high and low with more pronounced wicks
    const volatilityBase = Math.abs(close - open);
    const randomVolatility = Math.random() * 0.005; // Random factor for more natural looking wicks
    const highWick = volatilityBase * 2 + randomVolatility;
    const lowWick = volatilityBase * 2 + randomVolatility;
    
    const high = Math.max(open, close) + highWick;
    const low = Math.min(open, close) - lowWick;
    const isUp = close > open;
    const color = isUp ? "#22C55E" : "#EF4444";

    return {
      ...item,
      open,
      close,
      high,
      low,
      fill: color,
      stroke: color,
      wickColor: color,
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
        {/* Candlestick body */}
        <Bar
          dataKey={(data) => Math.abs(data.close - data.open)}
          fill={(data) => data.fill}
          stroke={(data) => data.stroke}
          barSize={8}
        />
        {/* High wick */}
        <Line
          type="monotone"
          dataKey="high"
          stroke={(data) => data.wickColor}
          dot={false}
          strokeWidth={2}
        />
        {/* Low wick */}
        <Line
          type="monotone"
          dataKey="low"
          stroke={(data) => data.wickColor}
          dot={false}
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;