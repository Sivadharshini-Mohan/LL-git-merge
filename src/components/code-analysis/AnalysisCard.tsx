import React from "react";

interface AnalysisCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div
      className={`bg-white flex w-full flex-col overflow-hidden items-stretch justify-center px-4 py-5 rounded-[18px] ${className}`}
    >
      <div className="w-full">
        <h3 className="text-black text-lg font-semibold leading-none tracking-[-0.2px]">
          {title}
        </h3>
        <div className="w-full mt-5">{children}</div>
      </div>
    </div>
  );
};
