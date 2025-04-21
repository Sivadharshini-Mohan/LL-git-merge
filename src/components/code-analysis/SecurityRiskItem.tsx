
import React, { useState } from "react";
import { ToggleSwitch } from "./ToggleSwitch";

interface SecurityRiskItemProps {
  color: string;
  label: string;
  count: string;
  icon?: string;
  details?: string[];
  isExpanded?: boolean;
  className?: string; // Added optional className prop
}

export const SecurityRiskItem: React.FC<SecurityRiskItemProps> = ({
  color,
  label,
  count,
  icon = "https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/e49378c7384eec2f43b1fa9eca788f862ede909f?placeholderIfAbsent=true",
  details = [],
  isExpanded = false,
  className = "",
}) => {
  const [expanded, setExpanded] = useState(isExpanded);
  const [active, setActive] = useState(isExpanded);

  const toggleActive = () => {
    setActive(!active);
    if (!active) {
      setExpanded(true);
    }
  };

  return (
    <div
      className={`${expanded && active ? "bg-[rgba(244,251,251,1)]" : "bg-white"} rounded w-full overflow-hidden ${expanded ? "pb-[7px]" : ""} ${className}`}
    >
      <div
        className={`${active && expanded ? "bg-[rgba(240,255,250,1)]" : ""} flex min-h-9 w-full gap-1 pl-2 pr-2 py-2 rounded-md`}
      >
        <img
          src={icon}
          className="aspect-[1] object-contain w-5 shrink-0"
          alt="Security icon"
        />
        <div className="flex min-w-60 items-center gap-2 justify-between flex-1 shrink basis-[0%]">
          <div className="self-stretch flex items-center gap-2 text-sm text-[#0A0D14] font-medium tracking-[-0.08px] leading-none my-auto">
            <div
              className={`${color} self-stretch flex w-3.5 shrink-0 h-3.5 my-auto rounded-[3px]`}
            />
            <div className="self-stretch my-auto">{label}</div>
          </div>
          <div className="self-stretch flex items-center my-auto">
            <div className="text-[rgba(10,13,20,1)] text-sm font-medium leading-none tracking-[-0.08px] text-right self-stretch w-[105px] my-auto">
              {count}
            </div>
            <ToggleSwitch isActive={active} onChange={toggleActive} />
          </div>
        </div>
      </div>
      {expanded && active && details.length > 0 && (
        <div className="w-full mt-2">
          {details.map((detail, index) => (
            <div
              key={index}
              className="flex min-h-5 w-full gap-[21px] mt-1.5 pr-2"
            >
              <div className="self-stretch min-w-60 gap-2.5 text-xs text-[rgba(82,88,102,1)] font-normal tracking-[-0.07px] leading-loose pl-6 pr-2">
                {detail}
              </div>
              <ToggleSwitch isActive={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
