import React from "react";
import GradeBadge from "./GradeBadge";
import { GradeType } from "./GradeBadge";

interface InsightMetricRowProps {
  label: string;
  value: string;
  grade?: GradeType;
  className?: string;
  isFullWidth?: boolean;
}

export const InsightMetricRow: React.FC<InsightMetricRowProps> = ({
  label,
  value,
  grade,
  className = "",
  isFullWidth = false,
}) => {
  return (
    <div className="flex min-w-60 items-center gap-[40px_100px] justify-between w-[354px]">
      <div
        className={`flex ${
          isFullWidth ? "w-full" : "flex-1"
        } items-center gap-[20px] justify-between ${className}`}
      >
        <div className="text-black font-normal">{label}</div>
        <div className="flex gap-[5px] whitespace-nowrap">
          <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
            {value}
          </div>
          {grade && <GradeBadge grade={grade} />}
        </div>
      </div>
    </div>
  );
};
