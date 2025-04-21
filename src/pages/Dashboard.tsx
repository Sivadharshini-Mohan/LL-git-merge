import React, { useState } from "react";
import Header from "../components/dashboard/Header";
import ProjectsHeader from "../components/dashboard/ProjectsHeader";
import ProjectCard from "../components/dashboard/ProjectCard";
import { Stage } from "../components/dashboard/ProjectStages";

const Dashboard: React.FC = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "IRCTC",
      description:
        "IRCTC (Indian Railway Catering and Tourism Corporation) is the official...",
      progress: {
        label: "Code Analysing",
        percentage: 65,
        lines: "1.2M Lines",
        time: "00:12",
      },
    },
    {
      id: 2,
      title: "Chennai Metro App",
      description:
        "Chennai metro mobile application need to be modernised to latest tech...",
      stages: [
        { name: "Assessment", status: "completed" as Stage["status"] },
        { name: "Comprehend", status: "in-progress" as Stage["status"] },
        { name: "Recommend", status: "pending" as Stage["status"] },
        { name: "Modernize", status: "pending" as Stage["status"] },
        { name: "Test", status: "pending" as Stage["status"] },
      ],
      lastUpdated: "12 Jan 2025",
    },
  ]);

  const handleAddProject = () => {
    // Implementation for adding a new project
    console.log("Add new project clicked");
  };

  return (
    <div className="bg-[rgba(244,251,251,1)] flex flex-col overflow-hidden items-center pb-[612px] max-md:pb-[100px]">
      <Header />

      <div className="w-full max-w-[1348px] flex flex-col items-center">
        <ProjectsHeader
          projectCount={projects.length}
          onAddProject={handleAddProject}
        />

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
      </div>
    </div>
  );
};

export default Dashboard;
