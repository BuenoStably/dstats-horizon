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
import { colors } from '../../theme';

interface ReserveRevenueChartProps {
  data: any[];
  formatCurrency: (value: number) => string;
}

const ReserveRevenueChart = ({ data, formatCurrency }: ReserveRevenueChartProps) => {
  const formatXAxis = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d");
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;

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
            bgcolor: colors.card,
            p: 1.5,
            border: `1px solid ${colors.border}`,
            borderRadius: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="body2" sx={{ color: colors.textMuted, mb: 1 }}>
            {format(new Date(label), "MMM d, yyyy")}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.primary, mb: 0.5 }}>
            APY Estimate: {formatPercentage(payload[1].value)}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.secondary }}>
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
        <ComposedChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            stroke={colors.chartGrid}
            tick={{ fill: colors.chartGrid }}
            tickLine={{ stroke: colors.chartGrid }}
            axisLine={{ stroke: colors.chartGrid }}
            interval="preserveStartEnd"
            minTickGap={50}
            style={{ fontFamily: 'Inter' }}
          />
          <YAxis
            yAxisId="left"
            domain={[minEarnings, maxEarnings]}
            tickFormatter={(value) => Math.round(value).toString()}
            stroke="transparent"
            tick={{ fill: colors.textPrimary }}
            tickLine={{ stroke: 'transparent' }}
            axisLine={{ stroke: 'transparent' }}
            style={{ fontFamily: 'Inter' }}
            width={window.innerWidth < 768 ? 35 : 50}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 1]}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
            stroke="transparent"
            tick={{ fill: colors.textPrimary }}
            tickLine={{ stroke: 'transparent' }}
            axisLine={{ stroke: 'transparent' }}
            style={{ fontFamily: 'Inter' }}
            width={window.innerWidth < 768 ? 35 : 50}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            yAxisId="left"
            dataKey="earnings"
            fill={colors.secondary}
            name="Earnings Estimate"
            barSize={20}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="apy"
            stroke={colors.primary}
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