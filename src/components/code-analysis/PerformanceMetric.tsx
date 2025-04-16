import React from "react";

interface PerformanceMetricProps {
  label: string;
  percentage: string;
  description: string;
  icon: string;
}

export const PerformanceMetric: React.FC<PerformanceMetricProps> = ({
  label,
  percentage,
  description,
  icon,
}) => {
  return (
    <div className="bg-[rgba(244,251,251,1)] flex w-full flex-col overflow-hidden items-stretch justify-center px-3.5 py-3 rounded-lg">
      <div className="w-full">
        <div className="text-[rgba(0,39,38,1)] text-xs leading-none tracking-[0.24px] uppercase">
          {label}
        </div>
        <div className="flex w-full gap-[40px_100px] justify-between mt-2.5">
          <div className="flex items-center gap-[5px] text-sm text-black tracking-[-0.08px] leading-none">
            <img
              src={icon}
              className="aspect-[1] object-contain w-[22px] self-stretch shrink-0"
              alt={label}
            />
            <div className="self-stretch">
              <span className="font-bold text-[18px] tracking-[-0.2px] text-[rgba(10,13,20,1)]">
                {percentage.replace("%", "")}
              </span>
              <span className="tracking-[-0.15px] text-[rgba(10,13,20,1)]">
                %
              </span>
            </div>
          </div>
          <div className="text-[rgba(82,88,102,1)] text-xs leading-loose text-right">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};
