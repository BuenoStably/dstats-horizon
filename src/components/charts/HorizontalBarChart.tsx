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
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ 
          top: 20,
          right: 20,
          left: 20,
          bottom: 20
        }}
      >
        <defs>
          <linearGradient id="assetsGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="33.33%" stopColor="#22C55E" />
            <stop offset="33.33%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#15803d" />
            <stop offset="50%" stopColor="#4B5563" />
            <stop offset="100%" stopColor="#4B5563" />
          </linearGradient>
        </defs>
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
          axisLine={true}
          style={{ 
            fontSize: '12px',
            fontFamily: 'Inter'
          }}
          width={80}
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
          radius={[0, 4, 4, 0]}
          fillOpacity={0.8}
          name="Balance"
          stroke="none"
          fill="url(#assetsGradient)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;