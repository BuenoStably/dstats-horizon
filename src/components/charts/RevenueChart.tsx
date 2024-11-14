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
    const date = new Date(dateStr);
    return format(date, "MMM d");
  };

  const formatPercentage = (value: number) => `${value}%`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 1.5,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {format(new Date(label), "MMM d, yyyy")}
          </Typography>
          <Typography variant="body2" color="primary">
            Revenue/TVL: {formatCurrency(payload[0].value)}
          </Typography>
          <Typography variant="body2" color="success.main">
            Annualized Revenue: {formatPercentage(payload[1].value)}%
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", height: 400, mt: 2 }}>
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            yAxisId="left"
            domain={[0, 80000]}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            ticks={[0, 20000, 40000, 60000, 80000]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[0, 0.5]}
            tickFormatter={(value) => `${(value * 100).toFixed(2)}%`}
            ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => {
              return value === "revenueTvl" ? "Revenue/TVL" : "Annualized Revenue";
            }}
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
            fill="#4caf50"
            name="annualizedRevenue"
            barSize={20}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;