import { Stage } from "@/components/dashboard/ProjectStages";

export interface ProjectProgress {
  label: string;
  percentage: number;
  lines: string;
  time: string;
}

export interface ProjectStage {
  name: string;
  status: Stage["status"];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  progress?: ProjectProgress;
  stages?: ProjectStage[];
  lastUpdated?: string;
} 