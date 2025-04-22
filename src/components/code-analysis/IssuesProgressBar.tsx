import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface IssuesProgressBarProps {
  issueTypes: string;
  occurrences: string;
}

export const IssuesProgressBar: React.FC<IssuesProgressBarProps> = ({
  issueTypes,
  occurrences,
}) => {
  // Convert string values to numbers
  const issueTypesValue = parseInt(issueTypes, 10);
  const occurrencesValue = parseInt(occurrences, 10);

  // Calculate total and percentages
  const total = issueTypesValue + occurrencesValue;
  const issueTypesPercentage = Math.round((issueTypesValue / total) * 100);

  // Custom Dual Progress Bar Component that shows two values segmented
  const DualProgressBar = () => (
    <div className="relative w-full h-3.5 rounded-lg overflow-hidden">
      {/* Blue background (occurrences) */}
      <div className="absolute inset-0 bg-[rgba(0,98,255,1)] rounded-lg" />

      {/* Green foreground (issue types) */}
      <div
        className="absolute top-0 left-0 h-full bg-[rgba(71,230,164,1)] rounded-l-lg"
        style={{ width: `${issueTypesPercentage}%` }}
      />

      {/* White separator line (only show if we have both colors) */}
      {issueTypesPercentage > 0 && issueTypesPercentage < 100 && (
        <div
          className="absolute top-0 h-full bg-white"
          style={{
            left: `${issueTypesPercentage}%`,
            width: "1px",
            zIndex: 2,
          }}
        />
      )}
    </div>
  );

  return (
    <div className="w-full">
      <DualProgressBar />

      <div className="flex w-full items-center gap-[40px_100px] text-sm text-[rgba(1,36,25,1)] font-bold whitespace-nowrap tracking-[-0.08px] leading-none justify-between mt-1">
        <div className="self-stretch my-auto">{issueTypes}</div>
        <div className="self-stretch my-auto">{occurrences}</div>
      </div>

      <div className="flex w-[294px] max-w-full flex-col items-stretch text-xs text-[rgba(73,72,72,1)] font-normal tracking-[-0.07px] leading-loose mt-3.5">
        <div className="flex w-full items-center gap-1">
          <div className="bg-[rgba(71,230,164,1)] self-stretch flex w-3 shrink-0 h-3 my-auto rounded-[50%]" />
          <div className="self-stretch my-auto">
            types of potential language compatibility issues
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="bg-[rgba(0,98,255,1)] self-stretch flex w-3 shrink-0 h-3 my-auto rounded-[50%]" />
          <div className="self-stretch my-auto">No of times issue occurs</div>
        </div>
      </div>
    </div>
  );
};
