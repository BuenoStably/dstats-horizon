import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

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
  const formatXAxis = (dateStr: string) => {
    const date = new Date(dateStr);
    const isJanFirst = date.getMonth() === 0 && date.getDate() === 1;
    return isJanFirst 
      ? format(date, "MMM d, yyyy")
      : format(date, "MMM d");
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis
          dataKey="date"
          stroke="#ffffff"
          tickFormatter={formatXAxis}
          tickLine={false}
          style={{ fontSize: '11px' }}
        />
        <YAxis
          stroke="#ffffff"
          tickFormatter={valueFormatter}
          axisLine={false}
          tickLine={false}
          domain={[0, 'auto']}
          style={{ fontSize: '11px' }}
        />
        <Tooltip
          contentStyle={{ background: "#242424", border: "none", opacity: 1 }}
          formatter={valueFormatter}
          labelFormatter={(label) => formatXAxis(label as string)}
        />
        <Area
          type="monotoneX"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill="url(#colorGradient)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartWithGradient;