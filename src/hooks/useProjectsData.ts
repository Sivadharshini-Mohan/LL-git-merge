import { useState } from "react";
import { Project } from "../types/project";

// Sample initial projects
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Flipkart Ecommerce',
    description: 'Java (Spring Boot), Angular, PostgreSQL modernization project',
    progress: {
      percentage: 65,
      lines: '8,234',
      time: '10h 15m',
      label: 'Analysis'
    },
    lastUpdated: '12 Jan 2025'
  },
  {
    id: '2',
    title: 'Banking System Migration',
    description: 'COBOL to Java migration with Oracle DB integration',
    progress: {
      percentage: 32,
      lines: '15,492',
      time: '24h 45m',
      label: 'In Progress'
    },
    lastUpdated: '5 Feb 2025'
  }
];

export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: String(Date.now()),
      progress: {
        percentage: 0,
        lines: '0',
        time: '0h 0m',
        label: 'New'
      }
    };
    
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject
  };
}; 