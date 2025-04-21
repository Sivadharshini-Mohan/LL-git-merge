import { useState } from "react";
import { Project } from "@/types/project";
import { projectsData } from "@/data/projects";

export function useProjectsData() {
  const [projects, setProjects] = useState<Project[]>(projectsData);

  const addProject = (project: Project) => {
    console.log(project);
    
    setProjects((prev) => [...prev, project]);
  };

  return {
    projects,
    addProject,
  };
} 