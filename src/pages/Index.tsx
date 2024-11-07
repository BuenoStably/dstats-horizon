import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import ChartCard from "@/components/ChartCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { Coins, Wallet, Percent, Gift } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Split the metrics data into a separate component
const MetricsSection = () => {
  const metrics = [
    {
      value: "$14.35M",
      label: "Total Protocol TVL",
      tooltip: "Total Value Locked across all protocol products",
      icon: <Coins className="w-6 h-6" />,
    },
    {
      value: "$3.00M",
      label: "Total dUSD Supply",
      tooltip: "Current total supply of dUSD in circulation",
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      value: "5.39%",
      label: "Net Borrow APY",
      tooltip: "Current net borrowing annual percentage yield",
      icon: <Percent className="w-6 h-6" />,
    },
    {
      value: "50x",
      label: "Lending Rewards",
      tooltip: "Current lending reward multiplier",
      icon: <Gift className="w-6 h-6" />,
    },
    {
      value: "50x",
      label: "LP Rewards",
      tooltip: "Current liquidity provider reward multiplier",
      icon: <Gift className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

// Split the charts section into a separate component
const ChartsSection = () => {
  const mockData = {
    tvl: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${(i + 1).toString().padStart(2, "0")}-01`,
      value: 14350000 + Math.random() * 1000000,
    })),
    supply: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${(i + 1).toString().padStart(2, "0")}-01`,
      value: 3000000 + Math.random() * 200000,
    })),
    apy: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${(i + 1).toString().padStart(2, "0")}-01`,
      value: 5.39 + Math.random() * 1,
    })),
    users: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${(i + 1).toString().padStart(2, "0")}-01`,
      value: 300 + i * 10 + Math.random() * 20,
    })),
    revenue: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${(i + 1).toString().padStart(2, "0")}-01`,
      revenue: 50000 + Math.random() * 10000,
      percentage: (Math.random() * 2).toFixed(2),
    })),
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Total Protocol TVL">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.tvl}>
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

        <ChartCard title="Total dUSD Supply">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.supply}>
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

        <ChartCard title="Net dUSD Borrow APY">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.apy}>
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

        <ChartCard title="Total Users">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.users}>
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
    </>
  );
};

// Split the revenue chart into a separate component
const RevenueChart = () => {
  const mockData = {
    revenue: Array.from({ length: 30 }, (_, i) => ({
      date: `2024-${(i + 1).toString().padStart(2, "0")}-01`,
      revenue: 50000 + Math.random() * 10000,
      percentage: (Math.random() * 2).toFixed(2),
    })),
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <ChartCard title="Protocol Revenue">
      <ScrollArea className="w-full">
        <div className="min-w-[800px]">
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={mockData.revenue}>
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
                formatter={(value: number, name: string) =>
                  name === "revenue"
                    ? formatCurrency(value)
                    : `${Number(value).toFixed(2)}%`
                }
              />
              <Bar
                yAxisId="left"
                dataKey="revenue"
                fill="#8702ff"
                opacity={0.8}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="percentage"
                stroke="#ff02d9"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ScrollArea>
    </ChartCard>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <MetricsSection />
        <ChartsSection />
        <RevenueChart />
      </main>
    </div>
  );
};

export default Index;
