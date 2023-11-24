// HtmlComponents.js
import React, { useState } from "react";

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
  setTimer,
  timer,
  toggleFullScreen,
  isFullScreen,
  pauseImage,
  playImage,
  minimizeImage,
  fullScreen,
  setPlaybarClicked,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate the percentage of completion for the progress bar
  const completionPercentage = (timer / 109) * 100;

  // Calculate the color based on the completion percentage
  const progressBarColor = `linear-gradient(to right, #fff ${completionPercentage}%, #555 ${completionPercentage}%, #555)`;

  const remainingTime = `-${formatTime(109 - timer)}`;

  const handleProgressBarClick = (event) => {
    const playbarDiv = event.currentTarget;
    const clickX = event.clientX - playbarDiv.getBoundingClientRect().left;
    const percentageClicked = (clickX / playbarDiv.offsetWidth) * 100;
    const newTimer = (percentageClicked / 100) * 109;

    setTimer(newTimer);
    setPlaybarClicked(true);
  };

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

      <div className="time flex justify-center items-center mx-2">
        <span
          className="text-gray-400"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ cursor: "default" }}
        >
          {isHovered ? remainingTime : formatTime(timer)}
        </span>
      </div>

      <div
        className="playbardiv w-[90%] h-full flex justify-center items-center ml-2"
        style={{ cursor: "pointer" }}
        onClick={handleProgressBarClick}
      >
        <div
          className="playbar w-full h-1 bg-gray-700"
          style={{
            background: progressBarColor,
            transition: "background 0.5s ease",
          }}
        ></div>
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
