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

interface LineChartWithGradientProps {
  data: Array<{ date: string; value: number }>;
  valueFormatter?: (value: number) => string;
  showSecondLine?: boolean;
  secondLineData?: any[];
  secondLineKey?: string;
  secondLineColor?: string;
  yAxisDomain?: [number, number];
}

const LineChartWithGradient = ({
  data,
  valueFormatter = (value: number) => value.toString(),
  showSecondLine,
  secondLineData,
  secondLineKey = "ethereumValue",
  secondLineColor = "#22C55E",
  yAxisDomain,
}: LineChartWithGradientProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={showSecondLine ? secondLineData : data}
        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8702ff" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#8702ff" stopOpacity={0} />
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
          angle={-45}
          textAnchor="end"
          height={40}
          interval={0}
          minTickGap={5}
        />
        <YAxis
          tickFormatter={valueFormatter}
          stroke="#ffffff"
          tick={{ fill: '#ffffff' }}
          tickLine={{ stroke: '#ffffff' }}
          width={60}
          domain={yAxisDomain || ['auto', 'auto']}
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
                      {entry.name}: {valueFormatter(entry.value)}
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
            stroke={secondLineColor}
            strokeWidth={2}
            fill="url(#colorEthereum)"
          />
        )}
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