import React from "react";
import { Project } from "../../types/project";
import ProjectCard from "../dashboard/ProjectCard";
import NavigationCard from "../ui/NavigationCard";
import { navigateToCodeAnalysis } from "../../utils/navigation";

interface ProjectsProps {
  openModal: () => void;
  projects: Project[];
}

export const Projects: React.FC<ProjectsProps> = ({ openModal, projects }) => {
  return (
    projects.length ? (
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
    ) : (
      <div className="w-full h-[795px] flex flex-col items-center justify-center shadow-[0_4px_10px_rgba(205,205,205,0.11)] bg-white rounded-2xl">
        <div className="flex flex-col items-center gap-[23px]">
          <div>
            <svg
              width="110"
              height="107"
              viewBox="0 0 110 107"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2_1229)">
                <path
                  d="M69.7957 24.0639H40.2292C39.5555 24.0648 38.9095 24.3325 38.4331 24.8085C37.9567 25.2844 37.6887 25.9297 37.6879 26.6028V92.2492L37.349 92.3525L30.0959 94.5714C29.7522 94.6762 29.3809 94.6403 29.0635 94.4718C28.7462 94.3033 28.5088 94.0159 28.4034 93.6727L6.82867 23.2701C6.72368 22.9267 6.75947 22.5557 6.92816 22.2386C7.09686 21.9216 7.38467 21.6844 7.72833 21.5792L18.9054 18.1602L51.308 8.25193L62.485 4.83293C62.6551 4.78063 62.8338 4.76235 63.011 4.77915C63.1882 4.79594 63.3603 4.84747 63.5175 4.9308C63.6747 5.01412 63.8139 5.12759 63.9272 5.26473C64.0405 5.40186 64.1255 5.55997 64.1776 5.72999L69.6923 23.7254L69.7957 24.0639Z"
                  fill="#E6FFF7"
                />
                <path
                  d="M76.2478 23.7262L69.6013 2.03757C69.4907 1.6762 69.3099 1.34014 69.0693 1.04859C68.8286 0.757036 68.5328 0.515715 68.1988 0.338411C67.8648 0.161106 67.499 0.0512931 67.1225 0.01525C66.746 -0.0207932 66.366 0.0176402 66.0044 0.12835L50.2901 4.93356L17.8893 14.8436L2.17503 19.6505C1.44503 19.8744 0.833792 20.3786 0.47548 21.0522C0.117169 21.7259 0.0410585 22.5141 0.263859 23.2438L22.9805 97.3666C23.1614 97.9557 23.5266 98.4712 24.0225 98.8377C24.5183 99.2041 25.1186 99.4022 25.7354 99.4028C26.0208 99.4029 26.3047 99.3602 26.5774 99.2759L37.3494 95.9821L37.6883 95.8772V95.5234L37.3494 95.6267L26.4774 98.9526C25.8331 99.1488 25.1371 99.0817 24.5422 98.766C23.9473 98.4503 23.502 97.9117 23.3041 97.2685L0.589225 23.144C0.491143 22.8252 0.456959 22.4903 0.488629 22.1584C0.520299 21.8264 0.617198 21.504 0.773785 21.2095C0.930371 20.915 1.14357 20.6543 1.40116 20.4423C1.65876 20.2302 1.95569 20.071 2.27496 19.9738L17.9892 15.1669L50.3902 5.25854L66.1044 0.451634C66.3465 0.377804 66.5983 0.34016 66.8515 0.339924C67.3949 0.341143 67.9236 0.516147 68.3602 0.839305C68.7968 1.16246 69.1183 1.61679 69.2777 2.13574L75.8938 23.7262L75.9988 24.0647H76.3512L76.2478 23.7262Z"
                  fill="#006042"
                />
              </g>
              <defs>
                <clipPath id="clip0_2_1229">
                  <rect
                    width="109.726"
                    height="107"
                    fill="white"
                    transform="translate(0.136963)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-[#15AE88] text-center">
            👋 No Projects Yet
          </h2>

          <p className="text-sm font-medium text-[#7B7B7B] text-center">
            Start by creating your first project to get things rolling.
          </p>

          <button
            onClick={openModal}
            className="text-sm font-semibold text-white w-[200px] h-9 shadow-[0_1px_2px_rgba(82,88,102,0.06)] bg-[#15AE88] rounded-lg mt-4"
          >
            + Add New Project
          </button>
        </div>
      </div>
    )
  );
}; 