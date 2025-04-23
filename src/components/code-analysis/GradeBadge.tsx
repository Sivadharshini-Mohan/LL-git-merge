import React from "react";

export type GradeType = "A" | "B" | "C" | "D";

interface GradeBadgeProps {
  grade: GradeType;
  size?: "small" | "medium" | "large";
  className?: string;
}

const GradeBadge: React.FC<GradeBadgeProps> = ({
  grade,
  size = "medium",
  className = "",
}) => {
  // Map grades to their corresponding colors
  const gradeColors = {
    A: "bg-[rgba(0,196,135,1)]",
    B: "bg-[rgba(141,196,0,1)]",
    C: "bg-[rgba(237,199,65,1)]",
    D: "bg-[rgba(253,69,69,1)]",
  };

  // Map sizes to dimensions
  const sizeClasses = {
    small: "w-[14px] h-[14px] text-xs",
    medium: "w-[18px] h-[18px] text-sm",
    large: "w-[24px] h-[24px] text-base",
  };

  return (
    <div
      className={`text-white font-bold text-center tracking-[0.14px] ${sizeClasses[size]} rounded-sm ${className}`}
    >
      <div
        className={`${gradeColors[grade]} ${sizeClasses[size]} px-0.5 rounded-sm flex items-center justify-center`}
      >
        {grade}
      </div>
    </div>
  );
};

export default GradeBadge;
