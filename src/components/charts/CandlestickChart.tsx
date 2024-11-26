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

interface CandlestickData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  barHeight: number;
  barStart: number;
  isUp: boolean;
  wickTop: number;
  wickBottom: number;
}

interface CandlestickChartProps {
  data: Array<{ date: string; value: number }>;
  valueFormatter: (value: number) => string;
}

const CandlestickChart = ({
  data,
  valueFormatter,
}: CandlestickChartProps) => {
  const processedData = data.map((item, index) => {
    const prevValue = index > 0 ? data[index - 1].value : item.value;
    const open = prevValue;
    const close = item.value;
    
    const volatilityBase = 0.005;
    const randomUpWick = Math.random() * volatilityBase;
    const randomDownWick = Math.random() * volatilityBase;
    
    const high = Math.max(open, close) * (1 + randomUpWick);
    const low = Math.min(open, close) * (1 - randomDownWick);
    const isUp = close > open;

    const barHeight = Math.abs(close - open);
    const barStart = Math.min(open, close);

    return {
      ...item,
      open,
      close,
      high,
      low,
      barHeight,
      barStart,
      isUp,
      wickTop: high - Math.max(open, close),
      wickBottom: Math.min(open, close) - low,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart 
        data={processedData}
        margin={{ top: 10, right: 10, left: 10, bottom: 25 }}
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
          dy={8}
          angle={-45}
          textAnchor="end"
          height={45}
          interval={0}
          minTickGap={5}
        />
        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={valueFormatter}
          stroke="#ffffff"
          tick={{ fill: "#ffffff" }}
          tickLine={{ stroke: "#ffffff" }}
          width={60}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload as CandlestickData;
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
          dataKey="barHeight"
          fill="#22C55E"
          stroke="#22C55E"
          barSize={8}
          stackId="candlestick"
          yAxisId={0}
          y={data.barStart}
        />
        <Bar
          dataKey="wickTop"
          fill="#22C55E"
          stroke="#22C55E"
          barSize={2}
          stackId="upperWick"
          yAxisId={0}
          y={data.high}
        />
        <Bar
          dataKey="wickBottom"
          fill="#22C55E"
          stroke="#22C55E"
          barSize={2}
          stackId="lowerWick"
          yAxisId={0}
          y={data.low}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;