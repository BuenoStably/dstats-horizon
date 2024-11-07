import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

interface LineChartWithGradientProps {
  data: any[];
  valueFormatter: (value: number) => string;
  color?: string;
}

const LineChartWithGradient = ({ 
  data, 
  valueFormatter,
  color = "#8702ff"
}: LineChartWithGradientProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.2}/>
            <stop offset="95%" stopColor={color} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis
          dataKey="date"
          stroke="#a0a0a0"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis
          stroke="#a0a0a0"
          tickFormatter={valueFormatter}
        />
        <Tooltip
          contentStyle={{ background: "#242424", border: "none" }}
          formatter={valueFormatter}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fillOpacity={1}
          fill="url(#colorGradient)"
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartWithGradient;