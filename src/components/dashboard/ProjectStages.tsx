import React from "react";

export type StageStatus = "completed" | "in-progress" | "pending";

export interface Stage {
  name: string;
  status: StageStatus;
}

interface ProjectStagesProps {
  stages: Stage[];
  lastUpdated?: string;
}

const ProjectStages: React.FC<ProjectStagesProps> = ({
  stages,
  lastUpdated,
}) => {
  const getStatusClass = (status: StageStatus) => {
    switch (status) {
      case "completed":
        return "bg-[rgba(48,245,184,1)]";
      case "in-progress":
        return "bg-[rgba(245,210,86,1)]";
      case "pending":
        return "bg-white border border-[rgba(223,223,223,1)] border-solid";
    }
  };

  const getTextClass = (status: StageStatus) => {
    return status === "completed" || status === "in-progress"
      ? "text-black"
      : "text-[rgba(0,32,22,1)]";
  };

  return (
    <div className="flex items-stretch justify-between w-full">
      <div className="bg-[rgba(244,251,251,1)] self-stretch flex items-stretch gap-[30px] text-sm font-medium whitespace-nowrap tracking-[-0.08px] leading-none flex-wrap pl-6 pr-[77px] py-[21px] rounded-lg max-md:px-5">
        {stages.map((stage, index) => (
          <div
            key={index}
            className={`flex items-stretch gap-1.5 ${getTextClass(stage.status)}`}
          >
            <div
              className={`${getStatusClass(stage.status)} flex w-4 shrink-0 h-4 my-auto rounded-[50%]`}
            />
            <div>{stage.name}</div>
          </div>
        ))}
      </div>
      {lastUpdated && (
        <div className="text-[rgba(0,43,30,1)] text-sm font-medium leading-[19px] tracking-[-0.08px] text-right my-auto">
          <span className="font-normal text-xs text-[rgba(97,102,101,1)]">
            Last Updated
          </span>
          <br />
          <span className="text-xs">{lastUpdated}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectStages;
