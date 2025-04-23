import React from "react";

interface PerformanceMetricProps {
  label: string;
  percentage: string;
  description: string;
  icon: string;
  className?: string; // Added optional className prop
}

export const PerformanceMetric: React.FC<PerformanceMetricProps> = ({
  label,
  percentage,
  description,
  icon,
  className = "",
}) => {
  // Remove the '%' if present and convert to number
  const percentValue = parseInt(percentage.replace("%", ""), 10);

  // Determine color based on percentage value
  const getColorClass = (percent: number) => {
    if (percent >= 80) return "bg-[#15AE88]"; // Using the teal color from the existing UI
    if (percent >= 60) return "bg-[#4FD1C5]";
    if (percent >= 40) return "bg-[#F6AD55]";
    return "bg-[#FC8181]";
  };

  return (
    <div
      className={`bg-[rgba(244,251,251,1)] flex w-full flex-col overflow-hidden items-stretch justify-center px-3.5 py-3 rounded-lg ${className}`}
    >
      <div className="w-full">
        <div className="text-[rgba(0,39,38,1)] text-xs leading-none tracking-[0.24px] uppercase mb-1">
          {label}
        </div>
        <div className="flex w-full gap-2 items-center">
          <img
            src={icon}
            className="aspect-[1] object-contain w-[22px] shrink-0"
            alt={label}
          />
          <div className="flex-1">
            <div className="flex justify-between mt-1">
              <div className="text-sm font-semibold">
                <span className="font-bold text-[18px] tracking-[-0.2px] text-[rgba(10,13,20,1)]">
                  {percentValue}
                </span>
                <span className="tracking-[-0.15px] text-[rgba(10,13,20,1)]">
                  %
                </span>
              </div>
              <div className="text-[rgba(82,88,102,1)] text-xs leading-loose text-right">
                {description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
