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
  const getBarFill = (entry: BarData) => {
    return entry.name === "Assets" ? "#22C55E" : "#ef4444";
  };

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ 
          top: 5,
          right: 30,
          left: 80,
          bottom: 5
        }}
      >
        <CartesianGrid 
          strokeDasharray="0" 
          stroke="rgba(255, 255, 255, 0.1)" 
          horizontal={false} 
        />
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
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            fontFamily: 'Inter'
          }}
        />
        <Bar
          dataKey="value"
          fill="#22C55E"
          radius={[0, 4, 4, 0]}
          fillOpacity={0.8}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;