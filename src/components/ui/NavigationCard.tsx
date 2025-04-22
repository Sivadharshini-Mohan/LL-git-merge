import React, { ReactNode } from "react";
import { navigateTo } from "../../utils/navigation";

interface NavigationCardProps {
  title: string;
  description?: string;
  path: string;
  params?: Record<string, string>;
  children?: ReactNode;
  className?: string;
}

/**
 * A reusable card component that navigates to a specified path when clicked
 */
const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  path,
  params,
  children,
  className = "",
}) => {
  const handleNavigate = () => {
    navigateTo(path, params);
  };

  return (
    <div
      className={`bg-white shadow-[0px_4px_10px_rgba(205,205,205,0.11)] flex flex-col p-4 rounded-2xl cursor-pointer hover:shadow-lg transition-shadow ${className}`}
      onClick={handleNavigate}
      title={`Navigate to ${title}`}
    >
      <h3 className="text-[rgba(0,196,135,1)] text-lg font-medium leading-none tracking-[-0.2px] mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-black text-sm font-normal leading-6 tracking-[-0.15px]">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default NavigationCard; 