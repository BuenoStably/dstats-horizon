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

interface RevenueChartProps {
  data: any[];
  formatCurrency: (value: number) => string;
}

const RevenueChart = ({ data, formatCurrency }: RevenueChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis
          dataKey="date"
          stroke="#a0a0a0"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis
          yAxisId="left"
          stroke="#a0a0a0"
          tickFormatter={(value) => formatCurrency(value)}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          stroke="#a0a0a0"
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{ background: "#242424", border: "none" }}
          formatter={(value: number, name: string) => {
            if (name === "revenue") return formatCurrency(value);
            return `${value}%`;
          }}
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