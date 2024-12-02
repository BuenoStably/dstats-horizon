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
  yAxisWidth?: number;
}

const HorizontalBarChart = ({ data, formatValue, yAxisWidth = window.innerWidth < 768 ? 45 : 80 }: HorizontalBarChartProps) => {
  // Calculate dynamic domain
  const calculateDomain = () => {
    const values = data.map(item => item.value);
    const max = Math.max(...values);
    const padding = max * 0.1;
    return [0, max + padding];
  };

  const [minValue, maxValue] = calculateDomain();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ 
          top: 20,
          right: 20,
          left: 0,
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
          domain={[minValue, maxValue]}
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
          width={yAxisWidth}
        />
        <Tooltip
          formatter={(value: number) => [formatValue(value), "Balance"]}
          contentStyle={{
            backgroundColor: "rgb(31, 29, 43)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            padding: "16px",
            minWidth: "200px",
            fontFamily: 'Inter',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
          }}
          labelStyle={{
            color: 'rgb(156, 163, 175)',
            marginBottom: '8px',
            display: 'block'
          }}
          itemStyle={{
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '4px 0'
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
