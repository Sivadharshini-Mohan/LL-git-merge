import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Projects } from "@/components/projects/Projects";
import { AddProjectModal } from "@/components/projects/AddProjectModal";
import CodeAnalyseCompleted from "@/components/code-analysis/CodeAnalyseCompleted";
import { useProjectsData } from "@/hooks/useProjectsData";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { projects, addProject } = useProjectsData();

  return (
    <div className="max-w-none w-full min-h-screen flex flex-col items-center bg-[#F4FBFB] mx-auto">
      <Header />

      <main className="w-full max-w-[1348px] flex flex-col items-start gap-5 p-5 max-md:p-5 max-sm:p-2.5">
        <div className="flex justify-between w-full max-sm:flex-col max-sm:items-start max-sm:gap-2.5">
          <h1 className="text-xl font-semibold text-black">Legacy Projects</h1>
          <button
            onClick={openModal}
            className="text-base font-medium text-[#15AE88] hover:text-[#0f8e6d] transition-colors"
          >
            + Add New Project
          </button>
        </div>
        <Projects openModal={openModal} projects={projects} />
      </main>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addProject={addProject}
      />
    </div>
  );
} 