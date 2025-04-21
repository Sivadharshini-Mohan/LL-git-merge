import { useProjectsData } from "@/hooks/useProjectsData";
import React from "react";
import ProjectCard from "../components/dashboard/ProjectCard";

const ProjectList: React.FC = () => {
  const { projects, addProject } = useProjectsData();

  const handleAddProject = () => {
    // Implementation for adding a new project
    console.log("Add new project clicked");
  };

  return (
    <div className="w-full flex flex-col gap-3 mt-5">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          progress={project.progress}
          stages={project.stages}
          lastUpdated={project.lastUpdated}
        />
      ))}
    </div>
  );
};

export default ProjectList; 