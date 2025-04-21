import React from "react";

interface CodeMetricRowProps {
  label: string;
  value: string;
  className?: string;
}

export const CodeMetricRow: React.FC<CodeMetricRowProps> = ({
  label,
  value,
  className = "",
}) => {
  return (
    <div
      className={`flex min-h-5 w-full items-center gap-6 leading-none flex-wrap ${className}`}
    >
      <div className="text-[rgba(0,141,137,1)] self-stretch w-[136px]">
        {label}
      </div>
      <div className="text-[#0a0d14] self-stretch flex-1 shrink basis-[0%]">
        {value}
      </div>
    </div>
  );
};
