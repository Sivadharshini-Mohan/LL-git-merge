import React, { useState } from "react";

interface ProjectsHeaderProps {
  projectCount: number;
  onAddProject?: () => void;
}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  projectCount,
  onAddProject,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex w-full max-w-[1348px] items-stretch gap-5 flex-wrap justify-between mt-10 max-md:max-w-full">
      <div className="flex flex-col items-stretch">
        <div className="text-black text-xl font-semibold leading-[1.2] tracking-[-0.22px]">
          Legacy Projects ({projectCount})
        </div>
        <div className="bg-white border flex items-stretch gap-1 text-sm text-[rgba(120,120,120,1)] font-normal tracking-[-0.15px] leading-6 mt-5 px-2.5 py-[7px] rounded-lg border-[rgba(236,236,236,1)] border-solid">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/79336b8ad23749bc3bf7c4bdd7a7926c4684c328?placeholderIfAbsent=true"
            alt="Search icon"
            className="aspect-[1] object-contain w-5 shrink-0 my-auto"
          />
          <input
            type="text"
            placeholder="Search Project"
            value={searchQuery}
            onChange={handleSearchChange}
            className="grow shrink w-[364px] basis-auto bg-transparent outline-none placeholder:text-[rgba(120,120,120,1)]"
          />
        </div>
      </div>
      <button
        onClick={onAddProject}
        className="text-[rgba(21,174,136,1)] text-base font-medium leading-none tracking-[-0.1px] cursor-pointer"
      >
        + Add New Project
      </button>
    </div>
  );
};

export default ProjectsHeader;
