import { Stage } from "../components/dashboard/ProjectStages";

export interface Project {
  id: string;
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