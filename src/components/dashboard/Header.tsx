import React from "react";

const Header: React.FC = () => {
  return (
    <div className="self-stretch flex w-full items-stretch gap-5 flex-wrap justify-between px-[46px] py-[11px] max-md:max-w-full max-md:px-5">
      <div className="gap-2.5 text-base text-black font-bold whitespace-nowrap tracking-[-0.1px]">
        Legacyleap
      </div>
      <div className="flex items-stretch gap-6">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/19c837447008d469ef1eabd6007f2e0827cfd9a8?placeholderIfAbsent=true"
          alt="Notification icon"
          className="aspect-[1] object-contain w-8 shrink-0 rounded-[0px_0px_0px_0px]"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/5bb07a04370c48b48c5595f7aa252b55/7575e010272ad0585291f682960e09e9662997a1?placeholderIfAbsent=true"
          alt="User profile"
          className="aspect-[1] object-contain w-8 shrink-0 rounded-[999px]"
        />
      </div>
    </div>
  );
};

export default Header;
