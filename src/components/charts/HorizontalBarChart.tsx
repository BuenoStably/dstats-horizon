import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CSSProperties } from "react";

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
          fill="#22C55E"
          onMouseEnter={(data) => {
            const bar = document.querySelector('.recharts-bar-rectangle');
            if (bar) {
              bar.setAttribute('fill', data.name === "Assets" ? "#22C55E" : "#ef4444");
            }
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;