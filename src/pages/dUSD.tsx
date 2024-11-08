import { DollarSign, Users, Wallet } from "lucide-react";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";

const MetricsSection = () => {
  const metrics = [
    {
      value: "$3.0M",
      label: "Total dUSD Supply",
      tooltip: "Total amount of dUSD tokens in circulation",
      icon: <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$3.1M",
      label: "Total NAV",
      tooltip: "Net Asset Value of all dUSD tokens",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$1.0334",
      label: "Unit NAV",
      tooltip: "Net Asset Value per dUSD token",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "$1.0069",
      label: "Last Price",
      tooltip: "Most recent trading price of dUSD",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "420",
      label: "dUSD Holders",
      tooltip: "Number of unique addresses holding dUSD",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

const DUSDPage = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 min-h-[calc(100vh-73px)]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">dUSD Analytics</h1>
        <MetricsSection />
      </main>
    </div>
  );
};

export default DUSDPage;