import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface BarData {
  name: string;
  value: number;
}

interface HorizontalBarChartProps {
  data: BarData[];
  formatValue: (value: number) => string;
}

const HorizontalBarChart = ({ data, formatValue }: HorizontalBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ 
          top: 20, 
          right: 30, 
          left: 80, 
          bottom: 20 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" horizontal={false} />
        <XAxis
          type="number"
          stroke="#ffffff"
          tickFormatter={formatValue}
          domain={[0, 4000000]}
          tickCount={5}
          style={{ 
            fontSize: '12px',
            fontFamily: 'Inter'
          }}
        />
        <YAxis
          type="category"
          dataKey="name"
          stroke="#ffffff"
          tickLine={false}
          style={{ 
            fontSize: '12px',
            fontFamily: 'Inter'
          }}
        />
        <Tooltip
          formatter={(value: number) => formatValue(value)}
          contentStyle={{
            backgroundColor: "rgb(36, 36, 36)",
            border: "none",
            borderRadius: "8px",
            fontFamily: 'Inter'
          }}
        />
        <Bar
          dataKey="value"
          fill="#8702ff"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;