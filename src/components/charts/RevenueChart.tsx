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
import { Box } from "@mui/material";

interface RevenueChartProps {
  data: any[];
  formatCurrency: (value: number) => string;
}

const RevenueChart = ({ data, formatCurrency }: RevenueChartProps) => {
  const formatXAxis = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d");
  };

  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="min-w-[8rem] rounded-lg border border-border/50 bg-card px-2.5 py-1.5 text-xs shadow-xl">
          <div className="font-medium">
            {format(new Date(label), "MMM d, yyyy")}
          </div>
          <div className="mt-1.5 grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: '#8702ff' }} />
              <div className="flex flex-1 justify-between items-center">
                <span className="text-muted-foreground">Revenue/TVL</span>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {formatCurrency(payload[0].value)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: '#22C55E' }} />
              <div className="flex flex-1 justify-between items-center">
                <span className="text-muted-foreground">Annualized Revenue</span>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {formatPercentage(payload[1].value)}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

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
            interval={0}
            style={{ fontFamily: 'Inter' }}
          />
          <YAxis
            yAxisId="left"
            domain={[0, 80000]}
            tickFormatter={(value) => value.toLocaleString()}
            ticks={[0, 20000, 40000, 60000, 80000]}
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
            domain={[0, 0.5]}
            tickFormatter={(value) => `${(value * 100)}%`}
            ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5]}
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
