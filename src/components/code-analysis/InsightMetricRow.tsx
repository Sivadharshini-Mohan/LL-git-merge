import React from "react";

type GradeType = "A" | "B" | "C" | "D";

interface InsightMetricRowProps {
  label: string;
  value: string;
  grade?: GradeType;
  className?: string;
}

export const InsightMetricRow: React.FC<InsightMetricRowProps> = ({
  label,
  value,
  grade,
  className = "",
}) => {
  const getGradeColor = (grade: GradeType) => {
    switch (grade) {
      case "A":
        return "bg-[rgba(0,196,135,1)]";
      case "B":
        return "bg-[rgba(141,196,0,1)]";
      case "C":
        return "bg-[rgba(237,199,65,1)]";
      case "D":
        return "bg-[rgba(253,69,69,1)]";
      default:
        return "";
    }
  };

  return (
    <div
      className={`flex w-full items-center gap-[40px_100px] justify-between ${className}`}
    >
      <div className="text-black font-normal self-stretch">{label}</div>
      <div className="flex gap-[5px] whitespace-nowrap">
        <div className="text-[rgba(53,53,53,1)] font-semibold text-right">
          {value}
        </div>
        {grade && (
          <div className="text-white font-bold text-center tracking-[0.14px] w-[18px] rounded-sm">
            <div
              className={`${getGradeColor(grade)} w-[18px] h-[18px] px-0.5 rounded-sm`}
            >
              {grade}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
