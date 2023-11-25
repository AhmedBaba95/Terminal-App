import React from "react";

const TitleLogo = ({ isFullScreen, borgLogo }) => {
  return (
    <div className=" w-full h-[4%] flex justify-center items-end gap-0.5">
      <div className="w-[4%] h-[80%] ">
        <img
          src={borgLogo}
          alt="Borg Icon"
          className="object-contain w-full h-full"
        />
      </div>
      <span
        className={`${
          isFullScreen ? "text-lg" : "text-xs"
        } font-sans text-slate-500`}
      >
        BorgBackup demo
      </span>
    </div>
  );
};

export default TitleLogo;
