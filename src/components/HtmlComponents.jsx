// HtmlComponents.js
import React from "react";

export const PlayButton = ({ togglePlayPause, playImage }) => {
  return (
    <button
      className="absolute bottom-4 left-0 transform flex justify-center items-center w-full h-full"
      onClick={togglePlayPause}
    >
      <img src={playImage} alt="" className="w-[18%] h-[20%]" />
    </button>
  );
};

export const VideoBar = ({
  isPlaying,
  togglePlayPause,
  formatTime,
  timer,
  toggleFullScreen,
  isFullScreen,
  pauseImage,
  playImage,
  minimizeImage,
  fullScreen,
}) => {
  return (
    <div className="videoBar absolute flex pr-2 bottom-0 w-full h-[8%] bg-black border-t-2 border-gray-700">
      <button
        className="flex justify-center items-center mx-2"
        onClick={togglePlayPause}
      >
        <img
          src={isPlaying ? pauseImage : playImage}
          alt=""
          className="w-[65%] h-[40%]"
        />
      </button>

      <div className="flex justify-center items-center mx-2">
        <span className="text-gray-400">{formatTime(timer)}</span>
      </div>

      <div className="w-[90%] h-full flex justify-center items-center ml-2">
        <div className="w-full h-1 bg-gray-700 "></div>
      </div>

      <button
        className="flex justify-center items-center ml-[4%]"
        onClick={toggleFullScreen}
      >
        <img
          src={isFullScreen ? minimizeImage : fullScreen}
          alt=""
          className="object-contain w-[75%] h-[62%]"
        />
      </button>
    </div>
  );
};
