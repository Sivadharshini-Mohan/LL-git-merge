import React from "react";

interface ToggleSwitchProps {
  isActive?: boolean;
  onChange?: () => void;
  activeColor?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isActive = false,
  onChange,
  activeColor = "bg-[#E2E4E9]",
}) => {
  const activeClass = isActive
    ? `bg-[rgba(32,155,152,1)] border-[rgba(28,109,107,1)]`
    : `border-t-[color:var(--neutral-300,#CDD0D5)] shadow-[0px_4px_4px_0px_rgba(15,15,16,0.06)_inset] ${activeColor}`;

  return (
    <div className="flex flex-col items-stretch justify-center w-8 p-0.5">
      <div
        className={`${activeClass} flex flex-col justify-center p-0.5 rounded-[96px] border-t border-solid cursor-pointer`}
        onClick={onChange}
      >
        <div
          className={`border-r-[color:var(--stroke-white-0,#FFF)] border-b-[color:var(--stroke-white-0,#FFF)] border-l-[color:var(--stroke-white-0,#FFF)] shadow-[0px_-3px_3px_0px_rgba(228,229,231,0.48)_inset,0px_6px_10px_0px_rgba(27,28,29,0.06),0px_2px_4px_0px_rgba(27,28,29,0.02)] bg-white flex w-3 shrink-0 h-3 rounded-[56px] border-r border-solid border-b border-l`}
        />
      </div>
    </div>
  );
};
