import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { Box, Typography } from "@mui/material";

interface ReserveRevenueChartProps {
  data: any[];
  formatCurrency: (value: number) => string;
}

const ReserveRevenueChart = ({ data, formatCurrency }: ReserveRevenueChartProps) => {
  const formatXAxis = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d");
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;

  // Calculate dynamic domains
  const calculateEarningsDomain = () => {
    const values = data.map(item => item.earnings);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;
    return [Math.max(0, Math.floor(min - padding)), Math.ceil(max + padding)];
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'rgb(31, 29, 43)',
            p: 1.5,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="body2" sx={{ color: "rgb(156, 163, 175)", mb: 1 }}>
            {format(new Date(label), "MMM d, yyyy")}
          </Typography>
          <Typography variant="body2" sx={{ color: "#8702ff", mb: 0.5 }}>
            APY Estimate: {formatPercentage(payload[1].value)}
          </Typography>
          <Typography variant="body2" sx={{ color: "#22C55E" }}>
            Earnings Estimate: {formatCurrency(payload[0].value)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const [minEarnings, maxEarnings] = calculateEarningsDomain();

  return (
    <Box sx={{ width: "100%", height: 400, mt: 2 }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 40 }}>
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            stroke="#4B5563"
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#4B5563' }}
            axisLine={{ stroke: '#4B5563' }}
            dy={10}
            angle={-45}
            textAnchor="end"
            height={60}
            interval="preserveStartEnd"
            minTickGap={50}
            style={{ fontFamily: 'Inter' }}
          />
          <YAxis
            yAxisId="left"
            domain={[minEarnings, maxEarnings]}
            tickFormatter={(value) => Math.round(value).toString()}
            stroke="transparent"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: 'transparent' }}
            axisLine={{ stroke: 'transparent' }}
            style={{ fontFamily: 'Inter' }}
            width={80}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 1]}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
            stroke="transparent"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: 'transparent' }}
            axisLine={{ stroke: 'transparent' }}
            style={{ fontFamily: 'Inter' }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            yAxisId="left"
            dataKey="earnings"
            fill="#22C55E"
            name="Earnings Estimate"
            barSize={20}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="apy"
            stroke="#8702ff"
            strokeWidth={2}
            dot={false}
            name="APY Estimate"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ReserveRevenueChart;