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
        <div className="text-xl sm:text-2xl font-bold text-primary">{value}</div>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-white font-normal text-xs sm:text-sm">{label}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[200px] sm:max-w-xs text-xs sm:text-sm">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default MetricCard;