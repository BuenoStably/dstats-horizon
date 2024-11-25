import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { format } from "date-fns";

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartWithGradientProps {
  data: DataPoint[];
  valueFormatter?: (value: number) => string;
}

const LineChartWithGradient = ({ data, valueFormatter }: LineChartWithGradientProps) => {
  // Calculate dynamic domain with 10% padding
  const { minDomain, maxDomain } = useMemo(() => {
    const values = data.map(d => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Calculate 10% of the range
    const padding = (max - min) * 0.1;
    
    return {
      minDomain: min - padding,
      maxDomain: max + padding
    };
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart 
        data={data}
        margin={{ top: 10, right: 10, left: 35, bottom: 10 }} // Reduced margins
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8702ff" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#8702ff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => format(new Date(date), "MMM d")}
          stroke="#ffffff"
          tick={{ fill: '#ffffff' }}
          tickLine={{ stroke: '#ffffff' }}
          dy={5} // Reduced padding between axis and labels
        />
        <YAxis
          domain={[minDomain, maxDomain]}
          tickFormatter={valueFormatter}
          stroke="#ffffff"
          tick={{ fill: '#ffffff' }}
          tickLine={{ stroke: '#ffffff' }}
          dx={-5} // Reduced padding between axis and labels
          tickMargin={5} // Reduced margin for tick labels
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-[rgb(18,17,28)] border border-white/10 p-2 rounded-lg shadow-lg backdrop-blur-sm">
                  <p className="text-white text-sm">
                    {format(new Date(label), "MMM d, yyyy")}
                  </p>
                  <p className="text-white font-medium">
                    {valueFormatter ? valueFormatter(payload[0].value as number) : payload[0].value}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8702ff"
          strokeWidth={2}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartWithGradient;