import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface RevenueChartProps {
  data: any[];
  formatCurrency: (value: number) => string;
}

const RevenueChart = ({ data, formatCurrency }: RevenueChartProps) => {
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    const isJanFirst = date.getMonth() === 0 && date.getDate() === 1;
    return isJanFirst 
      ? format(date, "MMM d, yyyy") // Show full date with year for Jan 1
      : format(date, "MMM d"); // Show only month and day otherwise
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis
          dataKey="date"
          stroke="#ffffff"
          tickFormatter={formatXAxis}
          tickLine={false}
        />
        <YAxis
          yAxisId="left"
          stroke="#ffffff"
          tickFormatter={(value) => formatCurrency(value)}
          tickLine={false}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#ffffff"
          tickFormatter={(value) => `${value}%`}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{ background: "#242424", border: "none" }}
          formatter={(value: number, name: string) => {
            if (name === "revenue") return formatCurrency(value);
            return `${value}%`;
          }}
          labelFormatter={formatXAxis}
        />
        <Bar
          yAxisId="left"
          dataKey="revenue"
          fill="#8702ff"
          opacity={0.3}
          barSize={30}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="percentage"
          stroke="#8702ff"
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;