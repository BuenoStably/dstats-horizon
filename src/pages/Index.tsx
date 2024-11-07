import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { ChartSection } from "@/components/ChartSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coins, Wallet, Percent, Gift, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2pdf from 'html2pdf.js';
import { toast } from "sonner";

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

const generateMockData = () => {
  const today = new Date();
  const mockData = {
    tvl: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 14350000 + Math.random() * 1000000,
    })),
    supply: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 3000000 + Math.random() * 200000,
    })),
    apy: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 5.39 + Math.random() * 1,
    })),
    users: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 300 + i * 10 + Math.random() * 20,
    })),
    revenue: Array.from({ length: 365 }, (_, i) => ({
      date: new Date(today.getTime() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      revenue: 50000 + Math.random() * 10000,
      percentage: (Math.random() * 2).toFixed(2),
    })),
  };
  return mockData;
};

const Index = () => {
  const mockData = generateMockData();

  const handleExportPDF = () => {
    const element = document.getElementById('dashboard-content');
    const opt = {
      margin: 1,
      filename: 'horizon-dashboard.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    toast.promise(
      html2pdf().set(opt).from(element).save(),
      {
        loading: 'Generating PDF...',
        success: 'PDF downloaded successfully!',
        error: 'Failed to generate PDF'
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button 
            onClick={handleExportPDF}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
        <div id="dashboard-content">
          <MetricsSection />
          <ChartSection mockData={mockData} />
        </div>
      </main>
    </div>
  );
};

export default Index;
