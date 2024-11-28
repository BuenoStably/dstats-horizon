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
  secondLineKey = "value",
  secondLineColor = "#22C55E",
  yAxisDomain,
  useAreaGradient = false,
}: LineChartWithGradientProps) => {
  const getEffectiveDomain = () => {
    const values = data.map(item => item.value);
    if (showSecondLine && secondLineData) {
      values.push(...secondLineData.map(item => item.value));
    }
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const padding = (maxValue - minValue) * 0.05; // Reduced padding to 5%
    return [minValue - padding, maxValue + padding] as [number, number];
  };

  // Calculate interval based on data length
  const calculateInterval = () => {
    const dataLength = data.length;
    if (dataLength <= 10) return 0;
    if (dataLength <= 20) return 1;
    if (dataLength <= 40) return 2;
    return Math.floor(dataLength / 10);
  };

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
              {entry.dataKey === "value" ? "AMO TVL" : "Reserve TVL"}: {valueFormatter(entry.value)}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  const shouldUseEffectiveDomain = !yAxisDomain || 
    (Array.isArray(yAxisDomain) && yAxisDomain[0] === 'auto' && yAxisDomain[1] === 'auto');

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
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
            interval={calculateInterval()}
            minTickGap={30}
          />
          <YAxis
            tickFormatter={valueFormatter}
            stroke="transparent"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: 'transparent' }}
            axisLine={{ stroke: 'transparent' }}
            width={60}
            domain={shouldUseEffectiveDomain ? getEffectiveDomain() : yAxisDomain}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8702ff"
            strokeWidth={2}
            fill={useAreaGradient ? "url(#colorValue)" : "none"}
            fillOpacity={1}
          />
          {showSecondLine && secondLineData && (
            <Area
              type="monotone"
              data={secondLineData}
              dataKey={secondLineKey}
              stroke={secondLineColor}
              strokeWidth={2}
              fill={useAreaGradient ? "url(#colorEthereum)" : "none"}
              fillOpacity={1}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChartWithGradient;
