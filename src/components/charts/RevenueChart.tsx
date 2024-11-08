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
      ? format(date, "MMM d, yyyy")
      : format(date, "MMM d");
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
          style={{ fontSize: '11px' }}
        />
        <YAxis
          yAxisId="left"
          stroke="#ffffff"
          tickFormatter={(value) => formatCurrency(value)}
          tickLine={false}
          style={{ fontSize: '11px' }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#ffffff"
          tickFormatter={(value) => `${value}%`}
          tickLine={false}
          style={{ fontSize: '11px' }}
        />
        <Tooltip
          contentStyle={{ 
            backgroundColor: "rgb(36, 36, 36)", 
            border: "none", 
            opacity: 1,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
          }}
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