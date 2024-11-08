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
  label: string;
  formatValue: (value: number) => string;
  showXAxis?: boolean;
}

const HorizontalBarChart = ({ 
  data, 
  label, 
  formatValue, 
  showXAxis = false 
}: HorizontalBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={80}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ 
          top: 5, 
          right: 30, 
          left: 80, 
          bottom: showXAxis ? 20 : 5 
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#333" horizontal={false} />
        {showXAxis && (
          <XAxis
            type="number"
            stroke="#ffffff"
            tickFormatter={formatValue}
            domain={[0, 3000000]}
            tickCount={4}
            style={{ fontSize: '11px' }}
          />
        )}
        <YAxis
          type="category"
          dataKey="name"
          stroke="#ffffff"
          tickLine={false}
          style={{ fontSize: '11px' }}
          label={{ 
            value: label,
            position: 'left',
            angle: -90,
            offset: 60,
            style: { textAnchor: 'middle', fill: '#ffffff' }
          }}
        />
        <Tooltip
          formatter={(value: number) => formatValue(value)}
          contentStyle={{
            backgroundColor: "rgb(36, 36, 36)",
            border: "none",
            borderRadius: "8px",
          }}
        />
        <Bar
          dataKey="value"
          fill={label === "Assets" ? "#8702ff" : "#4B5563"}
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;