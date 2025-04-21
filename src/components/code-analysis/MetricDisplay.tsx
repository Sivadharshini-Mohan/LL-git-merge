import React from "react";

type GradeType = "A" | "B" | "C" | "D";

interface MetricDisplayProps {
  label: string;
  value: string | GradeType;
  grade?: GradeType;
  icon?: string;
  infoText?: string;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({
  label,
  value,
  grade,
  icon,
  infoText,
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
        return "bg-[rgba(0,196,135,1)]";
    }
  };

  return (
    <div className="bg-[rgba(244,251,251,1)] self-stretch overflow-hidden flex-1 shrink basis-[0%] px-3 py-2.5 rounded-lg">
      <div className="flex w-full items-center gap-[40px_96px] font-bold justify-between">
        <div className="text-[rgba(0,39,38,1)] text-xs tracking-[0.24px] uppercase self-stretch">
          {label}
        </div>
        {grade ? (
          <div
            className={`${getGradeColor(grade)} self-stretch min-h-[34px] text-xl text-white whitespace-nowrap text-center tracking-[0.2px] w-[34px] h-[34px] px-2.5 rounded-[5px]`}
          >
            {grade}
          </div>
        ) : (
          <div className="bg-[rgba(141,196,0,1)] self-stretch min-h-[34px] text-xl text-white font-medium text-center tracking-[0.2px] px-2.5 rounded-[5px]">
            {value}
          </div>
        )}
      </div>
      {icon && (
        <div className="flex w-full items-center gap-[40px_100px] justify-between mt-2.5">
          <img
            src={icon}
            className="aspect-[1] object-contain w-[18px] self-stretch shrink-0"
            alt="Metric icon"
          />
          <img
            src={infoText ? infoText : icon}
            className="aspect-[1] object-contain w-3.5 self-stretch shrink-0"
            alt="Info icon"
          />
        </div>
      )}
    </div>
  );
};
