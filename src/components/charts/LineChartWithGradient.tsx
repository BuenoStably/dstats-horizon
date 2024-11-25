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
  ethereumValue?: number;
}

interface LineChartWithGradientProps {
  data: DataPoint[];
  valueFormatter?: (value: number) => string;
  showSecondLine?: boolean;
  secondLineData?: DataPoint[];
  secondLineKey?: string;
  secondLineColor?: string;
  color?: string;  // Added this prop
  yAxisDomain?: number[];  // Added this prop
}

const LineChartWithGradient = ({ 
  data, 
  valueFormatter,
  showSecondLine,
  secondLineData,
  secondLineKey = "ethereumValue",
  secondLineColor = "#22C55E",
  color = "#8702ff",  // Default color
  yAxisDomain,  // New prop
}: LineChartWithGradientProps) => {
  // Calculate dynamic domain with 10% padding if yAxisDomain is not provided
  const { minDomain, maxDomain } = useMemo(() => {
    if (yAxisDomain) {
      return {
        minDomain: yAxisDomain[0],
        maxDomain: yAxisDomain[1]
      };
    }

    const values = data.map(d => d.value);
    if (showSecondLine && secondLineData) {
      values.push(...secondLineData.map(d => d[secondLineKey as keyof typeof d] as number));
    }
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Calculate 10% of the range
    const padding = (max - min) * 0.1;
    
    return {
      minDomain: min - padding,
      maxDomain: max + padding
    };
  }, [data, showSecondLine, secondLineData, secondLineKey, yAxisDomain]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart 
        data={showSecondLine ? secondLineData : data}
        margin={{ top: 10, right: 10, left: 35, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorEthereum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={secondLineColor} stopOpacity={0.2} />
            <stop offset="95%" stopColor={secondLineColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => format(new Date(date), "MMM d")}
          stroke="#ffffff"
          tick={{ fill: '#ffffff' }}
          tickLine={{ stroke: '#ffffff' }}
          dy={5}
        />
        <YAxis
          domain={[minDomain, maxDomain]}
          tickFormatter={valueFormatter}
          stroke="#ffffff"
          tick={{ fill: '#ffffff' }}
          tickLine={{ stroke: '#ffffff' }}
          dx={-5}
          tickMargin={5}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-[rgb(18,17,28)] border border-white/10 p-2 rounded-lg shadow-lg backdrop-blur-sm">
                  <p className="text-white text-sm">
                    {format(new Date(label), "MMM d, yyyy")}
                  </p>
                  {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-white font-medium">
                      {entry.name}: {valueFormatter ? valueFormatter(entry.value) : entry.value}
                    </p>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        {showSecondLine && (
          <Area
            type="monotone"
            dataKey={secondLineKey}
            name="Ethereum TVL"
            stroke={secondLineColor}
            strokeWidth={2}
            fill="url(#colorEthereum)"
          />
        )}
        <Area
          type="monotone"
          dataKey="value"
          name="Fraxtal TVL"
          stroke={color}
          strokeWidth={2}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartWithGradient;