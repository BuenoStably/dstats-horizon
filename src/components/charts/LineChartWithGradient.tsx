import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { Box, Paper, Typography } from "@mui/material";

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
  const generateTicks = (domain: [number, number]) => {
    const [min, max] = domain;
    const ticks: number[] = [];
    let current = Math.floor(min * 4) / 4;
    while (current <= max) {
      ticks.push(current);
      current += 0.25;
    }
    return ticks;
  };

  const getEffectiveDomain = () => {
    const values = data.map(item => item.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const min = minValue - (Math.abs(minValue) * 0.05);
    const max = maxValue + (Math.abs(maxValue) * 0.05);
    return [min, max] as [number, number];
  };

  const domain = getEffectiveDomain();
  const ticks = generateTicks(domain);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={3}
          sx={{
            bgcolor: 'background.paper',
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {format(new Date(label), "MMM d, yyyy")}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.dataKey === "value" ? "Value" : "Value"}: {valueFormatter(entry.value)}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
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
            stroke="rgba(75, 85, 99, 1)"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: 'rgba(75, 85, 99, 1)' }}
            axisLine={{ stroke: 'rgba(75, 85, 99, 1)' }}
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
          <Tooltip content={<CustomTooltip />} />
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
    </Box>
  );
};

export default LineChartWithGradient;