
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProjectList } from "@/components/projects/ProjectList";
import { AddProjectModal } from "@/components/projects/AddProjectModal";
import Dashboard from "./Dashboard";

export default function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

        <ProjectList openModal={openModal} />
      </main>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <main className="min-h-screen">
<Dashboard />
</main>
    </div>


  );
}

