import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => {
  const timeframes = ["7D", "30D", "6M", "1Y", "All"];

  return (
    <div className="chart-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant="ghost"
              className="h-8 px-3 text-sm hover:text-primary"
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