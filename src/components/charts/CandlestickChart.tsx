import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Rectangle,
  Line
} from "recharts";
import { format } from "date-fns";

interface CandlestickChartProps {
  data: any[];
  valueFormatter: (value: number) => string;
  yAxisDomain?: number[];
}

// Custom candlestick component
const CustomCandlestick = (props: any) => {
  const { x, y, width, height, open, close, low, high, fill } = props;
  const isUp = close > open;
  const color = isUp ? "#22C55E" : "#EF4444";
  const bodyHeight = Math.abs(open - close);
  const bodyY = Math.min(open, close);

  return (
    <g>
      {/* Wick */}
      <line
        x1={x + width / 2}
        y1={y + height - high}
        x2={x + width / 2}
        y2={y + height - low}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <Rectangle
        x={x}
        y={y + height - bodyY - bodyHeight}
        width={width}
        height={Math.max(bodyHeight, 1)}
        fill={color}
        stroke={color}
      />
    </g>
  );
};

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
    
    return {
      ...item,
      open,
      close,
      high,
      low
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
        {processedData.map((entry, index) => (
          <CustomCandlestick
            key={index}
            x={index * 30}
            y={0}
            width={20}
            height={400}
            open={entry.open}
            close={entry.close}
            high={entry.high}
            low={entry.low}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CandlestickChart;