import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  onTimeframeChange?: (timeframe: string) => void;
}

const ChartCard = ({ title, children, onTimeframeChange }: ChartCardProps) => {
  const timeframes = ["7D", "30D", "6M", "1Y", "All"];
  const [selectedTimeframe, setSelectedTimeframe] = useState("7D");

  const handleTimeframeClick = (tf: string) => {
    setSelectedTimeframe(tf);
    if (onTimeframeChange) {
      onTimeframeChange(tf);
    }
  };

  return (
    <div className="chart-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={selectedTimeframe === tf ? "default" : "ghost"}
              className="h-8 px-3 text-sm"
              onClick={() => handleTimeframeClick(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ChartCard;