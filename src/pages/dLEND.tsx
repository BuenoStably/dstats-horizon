import { useState } from "react";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { Grid } from "@mui/material";
import { Percent, Users, ArrowUpDown, BarChart3, UserMinus } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import LineChartWithGradient from "@/components/charts/LineChartWithGradient";
import { generateMockApyData } from "@/utils/mockApyData";
import { filterDataByTimeframe } from "@/utils/dateUtils";

const DLENDPage = () => {
  const [supplyTimeframe, setSupplyTimeframe] = useState("7D");
  const [borrowTimeframe, setBorrowTimeframe] = useState("7D");

  const metrics = [
    {
      value: "9.0",
      label: "Debt Ratio",
      tooltip: "Current debt ratio of the protocol",
      icon: <ArrowUpDown className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "80.0%",
      label: "Current LTV",
      tooltip: "Current Loan to Value ratio",
      icon: <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "90.0%",
      label: "Current Utilization",
      tooltip: "Current protocol utilization rate",
      icon: <Percent className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "268",
      label: "Lenders",
      tooltip: "Total number of unique lenders",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
    {
      value: "127",
      label: "Borrowers",
      tooltip: "Total number of unique borrowers",
      icon: <UserMinus className="w-5 h-5 sm:w-6 sm:h-6" />,
    },
  ];

  const supplyApyData = generateMockApyData(3.5, 4.8);
  const borrowApyData = generateMockApyData(5.2, 5.9);

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-text-primary">dLEND Analytics</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index}
              value={metric.value}
              label={metric.label}
              tooltip={metric.tooltip}
              icon={metric.icon}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Grid container item>
            <ChartCard 
              title="Raw dUSD Supply APY" 
              onTimeframeChange={setSupplyTimeframe}
            >
              <LineChartWithGradient
                data={filterDataByTimeframe(supplyApyData, supplyTimeframe)}
                valueFormatter={formatPercentage}
              />
            </ChartCard>
          </Grid>

          <Grid container item>
            <ChartCard 
              title="Raw dUSD Borrow APY" 
              onTimeframeChange={setBorrowTimeframe}
            >
              <LineChartWithGradient
                data={filterDataByTimeframe(borrowApyData, borrowTimeframe)}
                valueFormatter={formatPercentage}
              />
            </ChartCard>
          </Grid>
        </div>
      </main>
    </div>
  );
};

export default DLENDPage;