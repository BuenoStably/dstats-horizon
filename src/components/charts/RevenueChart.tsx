import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { Box, Typography } from "@mui/material";

interface RevenueChartProps {
  data: any[];
  formatCurrency: (value: number) => string;
}

const RevenueChart = ({ data, formatCurrency }: RevenueChartProps) => {
  const formatXAxis = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d");
  };

  const calculateInterval = () => {
    const dataLength = data.length;
    if (dataLength <= 10) return 0; // Show all points for small datasets
    if (dataLength <= 20) return 1; // Show every other point
    if (dataLength <= 40) return 2; // Show every third point
    return Math.floor(dataLength / 10); // Show roughly 10 points for larger datasets
  };

  // Calculate dynamic Y-axis domain and ticks for revenue
  const calculateRevenueDomain = () => {
    const values = data.map(item => item.revenueTvl);
    const maxValue = Math.max(...values);
    const roundedMax = Math.ceil(maxValue / 20000) * 20000; // Round up to nearest 20k
    return [0, roundedMax];
  };

  // Calculate dynamic Y-axis domain and ticks for annualized revenue
  const calculateAnnualizedDomain = () => {
    const values = data.map(item => item.annualizedRevenue);
    const maxValue = Math.max(...values);
    // Increase the scale slightly to prevent overlap
    const roundedMax = Math.ceil(maxValue * 10) / 10 + 0.1; // Add 0.1 to give more space
    return [0, roundedMax];
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'rgb(31, 29, 43)',
            p: 2,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
            minWidth: '200px',
          }}
        >
          <Typography variant="body2" sx={{ color: 'rgb(156, 163, 175)', mb: 1 }}>
            {format(new Date(label), "MMM d, yyyy")}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography 
              key={index} 
              variant="body2" 
              sx={{ 
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 2,
                mb: 0.5
              }}
            >
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span style={{ fontFamily: 'monospace' }}>
                {entry.dataKey === 'annualizedRevenue' 
                  ? `${(entry.value * 100).toFixed(2)}%`
                  : formatCurrency(entry.value)
                }
              </span>
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  const [minRevenue, maxRevenue] = calculateRevenueDomain();
  const [minAnnualized, maxAnnualized] = calculateAnnualizedDomain();

  return (
    <Box sx={{ width: "100%", height: 400, mt: 2 }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 25 }}>
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            stroke="#4B5563"
            tick={{ fill: '#4B5563' }}
            tickLine={{ stroke: '#4B5563' }}
            axisLine={{ stroke: '#4B5563' }}
            dy={8}
            angle={-45}
            textAnchor="end"
            height={45}
            interval={calculateInterval()}
            minTickGap={30}
            style={{ fontFamily: 'Inter' }}
          />
          <YAxis
            yAxisId="left"
            domain={[minRevenue, maxRevenue]}
            tickFormatter={(value) => Math.round(value).toLocaleString()}
            stroke="transparent"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: 'transparent' }}
            axisLine={{ stroke: 'transparent' }}
            style={{ fontFamily: 'Inter' }}
            width={80}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            domain={[minAnnualized, maxAnnualized]}
            tickFormatter={(value) => `${Math.round(value * 100)}%`}
            stroke="transparent"
            tick={{ fill: '#ffffff' }}
            tickLine={{ stroke: 'transparent' }}
            axisLine={{ stroke: 'transparent' }}
            style={{ fontFamily: 'Inter' }}
            width={80}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => {
              return value === "revenueTvl" ? "Revenue/TVL" : "Annualized Revenue";
            }}
            wrapperStyle={{ fontFamily: 'Inter', color: '#ffffff' }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenueTvl"
            stroke="#8702ff"
            strokeWidth={2}
            dot={false}
            name="revenueTvl"
          />
          <Bar
            yAxisId="right"
            dataKey="annualizedRevenue"
            fill="#22C55E"
            name="annualizedRevenue"
            barSize={20}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RevenueChart;
