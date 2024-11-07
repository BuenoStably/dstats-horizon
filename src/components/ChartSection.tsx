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

const ChartComponent = ({ data, valueKey, formatter, timeframe }: any) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={filterDataByTimeframe(data, timeframe)}>
      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
      <XAxis
        dataKey="date"
        stroke="#a0a0a0"
        tickFormatter={(value) => new Date(value).toLocaleDateString()}
      />
      <YAxis stroke="#a0a0a0" tickFormatter={formatter} />
      <Tooltip
        contentStyle={{ background: "#242424", border: "none" }}
        formatter={formatter}
      />
      <Line
        type="monotone"
        dataKey={valueKey}
        stroke="#8702ff"
        strokeWidth={2}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <ChartCard title="Total Protocol TVL" onTimeframeChange={setTvlTimeframe}>
        <ChartComponent
          data={mockData.tvl}
          valueKey="value"
          formatter={formatCurrency}
          timeframe={tvlTimeframe}
        />
      </ChartCard>

      <ChartCard title="Total dUSD Supply" onTimeframeChange={setSupplyTimeframe}>
        <ChartComponent
          data={mockData.supply}
          valueKey="value"
          formatter={formatCurrency}
          timeframe={supplyTimeframe}
        />
      </ChartCard>

      <ChartCard title="Net dUSD Borrow APY" onTimeframeChange={setApyTimeframe}>
        <ChartComponent
          data={mockData.apy}
          valueKey="value"
          formatter={(value: number) => `${value.toFixed(2)}%`}
          timeframe={apyTimeframe}
        />
      </ChartCard>

      <ChartCard title="Total Users" onTimeframeChange={setUsersTimeframe}>
        <ChartComponent
          data={mockData.users}
          valueKey="value"
          formatter={(value: number) => value.toFixed(0)}
          timeframe={usersTimeframe}
        />
      </ChartCard>

      <ChartCard
        title="Protocol Revenue"
        onTimeframeChange={setRevenueTimeframe}
        className="lg:col-span-2"
      >
        <ChartComponent
          data={mockData.revenue}
          valueKey="revenue"
          formatter={formatCurrency}
          timeframe={revenueTimeframe}
        />
      </ChartCard>
    </div>
  );
};