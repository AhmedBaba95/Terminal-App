import React, { useState, useEffect } from "react";
import Terminal from "./components/Terminal";
import playImage from "../public/play-xxl.png";
import fullScreen from "../public/full-screen.png";
import minimizeImage from "../public/minimize.png";
import pauseImage from "../public/pause.png";

function App() {
  const [isFullScreen, setFullScreen] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [hasVideoPlayed, setHasVideoPlayed] = useState(false);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      // Enter fullscreen
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setFullScreen(!isFullScreen);
  };

  const togglePlayPause = () => {
    setPlaying(!isPlaying);
    setHasVideoPlayed(true);
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div
      className={`App flex ${
        isFullScreen
          ? "flex-col items-center justify-center w-screen h-screen mt-0"
          : "w-[55vw] h-[70vh] mt-[15vh]"
      } bg-gray-950 overflow-auto relative`}
    >
      {!hasVideoPlayed && !isPlaying && (
        <button
          className="absolute bottom-4 left-0 transform flex justify-center items-center w-full h-full"
          onClick={togglePlayPause}
        >
          <img src={playImage} alt="" className="w-[18%] h-[20%]" />
        </button>
      )}

      <Terminal isPlaying={isPlaying} />

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
    </div>
  );
}

export default App;
