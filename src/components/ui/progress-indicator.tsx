import React from "react";

interface ProgressIndicatorProps {
  progress: number;
  lines?: string;
  time?: string;
  label?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  lines,
  time,
  label,
}) => {
  return (
    <div className="bg-[rgba(244,251,251,1)] flex flex-col items-stretch grow shrink-0 basis-0 w-fit px-3.5 py-[11px] rounded-lg max-md:max-w-full">
      <div className="flex w-full gap-5 text-base flex-wrap justify-between max-md:max-w-full">
        <div className="flex items-stretch gap-[9px]">
          <div className="text-[rgba(10,13,20,1)] font-semibold tracking-[-0.18px] grow">
            {label || "Code Analysing"}
          </div>
          <div className="text-[rgba(96,96,96,1)] font-normal leading-none tracking-[-0.1px] my-auto">
            {lines || "1.2M Lines"}
          </div>
        </div>
        <div className="flex items-stretch gap-2.5 whitespace-nowrap tracking-[-0.18px] mt-[5px]">
          <div className="text-[rgba(96,96,96,1)] font-normal">
            {time || "00:12"}
          </div>
          <div className="text-[rgba(10,13,20,1)] font-semibold">
            {progress}%
          </div>
        </div>
      </div>
      <div className="bg-[rgba(237,237,237,1)] flex w-[714px] max-w-full flex-col rounded-[40px] max-md:pr-5">
        <div
          className="flex shrink-0 h-2.5 rounded-[40px] bg-[rgba(0,196,135,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
