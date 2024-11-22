import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { DollarSign, Percent, Users } from "lucide-react";

const DLENDPage = () => {
  const metrics = [
    {
      value: "$2.1M",
      label: "Total Value Locked",
      tooltip: "Total value locked in dLEND protocol",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "4.2%",
      label: "Current APY",
      tooltip: "Current annual percentage yield",
      icon: <Percent className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "156",
      label: "Active Users",
      tooltip: "Number of unique addresses using dLEND",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 min-h-[calc(100vh-73px)]">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">dLEND Analytics</h1>
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

export default DLENDPage;