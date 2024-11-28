import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
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
          <linearGradient id="assetsGradientHover" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#16A34A" />
            <stop offset="33.33%" stopColor="#16A34A" />
            <stop offset="33.33%" stopColor="#166534" />
            <stop offset="50%" stopColor="#166534" />
            <stop offset="50%" stopColor="#374151" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>
        <XAxis
          type="number"
          stroke="#4B5563"
          tickFormatter={formatValue}
          domain={[0, 4000000]}
          tickCount={5}
          axisLine={{ stroke: '#4B5563' }}
          tick={{ fill: '#4B5563' }}
          tickLine={{ stroke: '#4B5563' }}
          style={{ 
            fontSize: '12px',
            fontFamily: 'Inter'
          }}
        />
        <YAxis
          type="category"
          dataKey="name"
          stroke="transparent"
          tickLine={false}
          axisLine={{ stroke: 'transparent' }}
          tick={{ fill: '#ffffff' }}
          style={{ 
            fontSize: '12px',
            fontFamily: 'Inter'
          }}
          width={80}
        />
        <Tooltip
          formatter={(value: number) => formatValue(value)}
          contentStyle={{
            backgroundColor: "rgba(31, 29, 43, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            fontFamily: 'Inter',
            color: '#ffffff'
          }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
        />
        <Bar
          dataKey="value"
          radius={[0, 4, 4, 0]}
          fillOpacity={0.9}
          name="Balance"
          stroke="none"
          onMouseOver={(data, index) => {
            document.querySelector(`#bar-${index}`)?.setAttribute('fill', data.name === "Assets" ? "url(#assetsGradientHover)" : "#b91c1c");
          }}
          onMouseOut={(data, index) => {
            document.querySelector(`#bar-${index}`)?.setAttribute('fill', data.name === "Assets" ? "url(#assetsGradient)" : "#dc2626");
          }}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`}
              id={`bar-${index}`}
              fill={entry.name === "Assets" ? "url(#assetsGradient)" : "#dc2626"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;