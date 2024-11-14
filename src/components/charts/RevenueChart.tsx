import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { Box, Typography } from "@mui/material";

interface RevenueChartProps {
  data: any[];
  formatCurrency: (value: number) => string;
}

const RevenueChart = ({ data, formatCurrency }: RevenueChartProps) => {
  const formatXAxis = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d");
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.05)",
            p: 1.5,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 1,
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography variant="body2" sx={{ color: "rgb(156, 163, 175)" }}>
            {format(new Date(label), "MMM d, yyyy")}
          </Typography>
          <Typography variant="body2" sx={{ color: "#8702ff" }}>
            Revenue/TVL: {formatCurrency(payload[0].value)}
          </Typography>
          <Typography variant="body2" sx={{ color: "#22C55E" }}>
            Annualized Revenue: {formatPercentage(payload[1].value)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", height: 400, mt: 2 }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ left: 10, right: 10, top: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            stroke="#ffffff"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: '#ffffff' }}
            dy={10}
            height={60}
            style={{ fontFamily: 'Inter' }}
          />
          <YAxis
            yAxisId="left"
            domain={[0, 80000]}
            tickFormatter={(value) => value.toLocaleString()}
            ticks={[0, 20000, 40000, 60000, 80000]}
            stroke="#ffffff"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: '#ffffff' }}
            style={{ fontFamily: 'Inter' }}
            width={80}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 0.5]}
            tickFormatter={(value) => `${(value * 100)}%`}
            ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5]}
            stroke="#ffffff"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: '#ffffff' }}
            style={{ fontFamily: 'Inter' }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => {
              return value === "revenueTvl" ? "Revenue/TVL" : "Annualized Revenue";
            }}
            wrapperStyle={{ fontFamily: 'Inter', color: '#ffffff' }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenueTvl"
            stroke="#8702ff"
            strokeWidth={2}
            dot={false}
            name="revenueTvl"
          />
          <Bar
            yAxisId="right"
            dataKey="annualizedRevenue"
            fill="#22C55E"
            name="annualizedRevenue"
            barSize={20}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;