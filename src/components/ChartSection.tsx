import { useState } from "react";
import ChartCard from "./ChartCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import { filterDataByTimeframe } from "@/utils/dateUtils";

interface ChartSectionProps {
  mockData: {
    tvl: any[];
    supply: any[];
    apy: any[];
    users: any[];
    revenue: any[];
  };
}

export const ChartSection = ({ mockData }: ChartSectionProps) => {
  const [tvlTimeframe, setTvlTimeframe] = useState("7D");
  const [supplyTimeframe, setSupplyTimeframe] = useState("7D");
  const [apyTimeframe, setApyTimeframe] = useState("7D");
  const [usersTimeframe, setUsersTimeframe] = useState("7D");
  const [revenueTimeframe, setRevenueTimeframe] = useState("7D");

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Total Protocol TVL" onTimeframeChange={setTvlTimeframe}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filterDataByTimeframe(mockData.tvl, tvlTimeframe)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="date"
                stroke="#a0a0a0"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                stroke="#a0a0a0"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                contentStyle={{ background: "#242424", border: "none" }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8702ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Total dUSD Supply" onTimeframeChange={setSupplyTimeframe}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filterDataByTimeframe(mockData.supply, supplyTimeframe)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="date"
                stroke="#a0a0a0"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                stroke="#a0a0a0"
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                contentStyle={{ background: "#242424", border: "none" }}
                formatter={(value: number) => formatCurrency(value)}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8702ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Net dUSD Borrow APY" onTimeframeChange={setApyTimeframe}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filterDataByTimeframe(mockData.apy, apyTimeframe)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="date"
                stroke="#a0a0a0"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis
                stroke="#a0a0a0"
                tickFormatter={(value) => `${value.toFixed(2)}%`}
              />
              <Tooltip
                contentStyle={{ background: "#242424", border: "none" }}
                formatter={(value: number) => `${value.toFixed(2)}%`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8702ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Total Users" onTimeframeChange={setUsersTimeframe}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filterDataByTimeframe(mockData.users, usersTimeframe)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis
                dataKey="date"
                stroke="#a0a0a0"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis stroke="#a0a0a0" />
              <Tooltip
                contentStyle={{ background: "#242424", border: "none" }}
                formatter={(value: number) => value.toFixed(0)}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8702ff"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard 
        title="Protocol Revenue" 
        onTimeframeChange={setRevenueTimeframe}
        className="col-span-full"
      >
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={filterDataByTimeframe(mockData.revenue, revenueTimeframe)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="date"
              stroke="#a0a0a0"
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <YAxis
              yAxisId="left"
              stroke="#a0a0a0"
              tickFormatter={(value) => formatCurrency(value)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#a0a0a0"
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{ background: "#242424", border: "none" }}
              formatter={(value: number, name: string) => {
                if (name === "revenue") return formatCurrency(value);
                return `${value}%`;
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              fill="#8702ff"
              opacity={0.3}
              barSize={30}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="percentage"
              stroke="#8702ff"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};