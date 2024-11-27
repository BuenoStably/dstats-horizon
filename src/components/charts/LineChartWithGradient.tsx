import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
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
  yAxisDomain?: [number | 'auto' | undefined, number | 'auto' | undefined];
  useAreaGradient?: boolean;
}

const LineChartWithGradient = ({
  data,
  valueFormatter = (value: number) => value.toString(),
  showSecondLine,
  secondLineData,
  secondLineKey = "ethereumValue",
  secondLineColor = "#22C55E",
  yAxisDomain = ['auto', 'auto'],
  useAreaGradient = false,
}: LineChartWithGradientProps) => {
  // Generate ticks in 0.25% increments within the domain
  const generateTicks = (domain: [number, number]) => {
    const [min, max] = domain;
    const ticks: number[] = [];
    let current = Math.floor(min * 4) / 4; // Round down to nearest 0.25
    while (current <= max) {
      ticks.push(current);
      current += 0.25;
    }
    return ticks;
  };

  // Get the actual domain based on the provided yAxisDomain or data
  const getEffectiveDomain = () => {
    if (yAxisDomain && typeof yAxisDomain[0] === 'number' && typeof yAxisDomain[1] === 'number') {
      return yAxisDomain as [number, number];
    }
    const values = data.map(item => item.value);
    return [Math.min(...values), Math.max(...values)];
  };

  const domain = getEffectiveDomain();
  const ticks = generateTicks(domain);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={showSecondLine ? secondLineData : data}
        margin={{ top: 10, right: 10, left: 10, bottom: 25 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8702ff" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8702ff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorEthereum" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={secondLineColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={secondLineColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(date) => format(new Date(date), "MMM d")}
          stroke="#4B5563"
          tick={{ fill: '#ffffff' }}
          tickLine={{ stroke: '#4B5563' }}
          axisLine={{ stroke: '#4B5563' }}
          dy={8}
          angle={-45}
          textAnchor="end"
          height={45}
          interval={0}
          minTickGap={5}
        />
        <YAxis
          tickFormatter={valueFormatter}
          stroke="transparent"
          tick={{ fill: '#ffffff' }}
          tickLine={{ stroke: 'transparent' }}
          axisLine={{ stroke: 'transparent' }}
          width={60}
          domain={domain}
          ticks={ticks}
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-black/60 text-white rounded-lg border border-white/10 p-3 shadow-lg backdrop-blur-sm">
                  <p className="text-white text-xs mb-1">
                    {format(new Date(label), "MMM d, yyyy")}
                  </p>
                  {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-white text-xs">
                      <span>
                        {entry.dataKey === "value" ? "Value" : "Value"}
                      </span>
                      <span>: </span>
                      <span className="font-medium">
                        {valueFormatter(entry.value)}
                      </span>
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
            fill={useAreaGradient ? "url(#colorEthereum)" : "none"}
            fillOpacity={1}
          />
        )}
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8702ff"
          strokeWidth={2}
          fill={useAreaGradient ? "url(#colorValue)" : "none"}
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartWithGradient;