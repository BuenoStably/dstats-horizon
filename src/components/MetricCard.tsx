import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  value: string;
  label: string;
  tooltip: string;
  icon?: React.ReactNode;
}

const MetricCard = ({ value, label, tooltip, icon }: MetricCardProps) => {
  return (
    <div className="metric-card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-bold text-primary">{value}</div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-text-secondary text-sm">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-text-secondary" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MetricCard;