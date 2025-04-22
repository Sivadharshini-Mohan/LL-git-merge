import React from "react";
import ProjectStages, { Stage } from "./ProjectStages";
import ProgressIndicator from "../ui/progress-indicator";
import { navigateToCodeAnalysis } from "../../utils/navigation";

interface ProjectCardProps {
  title: string;
  description: string;
  progress?: {
    label?: string;
    percentage: number;
    lines?: string;
    time?: string;
  };
  stages?: Stage[];
  lastUpdated?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  progress,
  stages,
  lastUpdated,
}) => {
  return (
    <div 
      className="bg-white shadow-[0px_4px_10px_rgba(205,205,205,0.11)] flex w-full max-w-[1348px] items-center gap-5 flex-wrap justify-between px-4 py-3.5 rounded-2xl max-md:max-w-full cursor-pointer hover:shadow-lg transition-shadow"
      onClick={navigateToCodeAnalysis}
      title="Click to view code analysis"
    >
      <div className="self-stretch flex flex-col items-stretch my-auto max-md:max-w-full">
        <div className="text-[rgba(0,196,135,1)] text-lg font-medium leading-none tracking-[-0.2px]">
          {title}
        </div>
        <div className="text-black text-sm font-normal leading-6 tracking-[-0.15px] mt-1.5 max-md:max-w-full">
          {description}
        </div>
      </div>

      {progress && (
        <ProgressIndicator
          progress={progress.percentage}
          lines={progress.lines}
          time={progress.time}
          label={progress.label}
        />
      )}

      {stages && <ProjectStages stages={stages} lastUpdated={lastUpdated} />}
    </div>
  );
};

export default ProjectCard;