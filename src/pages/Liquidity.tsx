import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { DollarSign, TrendingUp, Users } from "lucide-react";

const LiquidityPage = () => {
  const metrics = [
    {
      value: "$5.2M",
      label: "Total Liquidity",
      tooltip: "Total liquidity across all pools",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$42.5K",
      label: "24h Volume",
      tooltip: "Trading volume in the last 24 hours",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "89",
      label: "Active LPs",
      tooltip: "Number of active liquidity providers",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 min-h-[calc(100vh-73px)]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Liquidity Analytics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
        <div className="text-center text-gray-500 mt-8">
          More analytics features coming soon
        </div>
      </main>
    </div>
  );
};

export default LiquidityPage;