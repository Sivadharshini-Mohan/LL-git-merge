import React from "react";
import { navigateToProjects } from "../../utils/navigation";

export const Header: React.FC = () => {
  return (
    <header className="bg-[#24E5A9] w-full py-3 px-5">
      <div className="max-w-[1348px] mx-auto flex items-center justify-between">
        <div 
          className="text-black font-bold text-lg cursor-pointer"
          onClick={navigateToProjects}
        >
              Legacyleap
        </div>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#1A1A1A] rounded-full flex items-center justify-center">
            <span className="text-white text-sm">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};
