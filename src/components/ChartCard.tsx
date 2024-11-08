import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  onTimeframeChange?: (timeframe: string) => void;
  className?: string;
}

const ChartCard = ({ title, children, onTimeframeChange, className }: ChartCardProps) => {
  const timeframes = ["7D", "30D", "6M", "1Y", "All"];
  const [selectedTimeframe, setSelectedTimeframe] = useState("7D");

  const handleTimeframeClick = (tf: string) => {
    setSelectedTimeframe(tf);
    if (onTimeframeChange) {
      onTimeframeChange(tf);
    }
  };

  return (
    <div className={`chart-card ${className || ''}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex flex-wrap gap-2">
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