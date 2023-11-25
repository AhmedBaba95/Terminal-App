import React, { useState, useEffect } from "react";
import { VideoBar, PlayButton } from "./components/HtmlComponents";
import TitleLogo from "./components/TitleLogo";
import Terminal from "./components/Terminal";
import playImage from "../public/play-xxl.png";
import fullScreen from "../public/full-screen.png";
import minimizeImage from "../public/minimize.png";
import pauseImage from "../public/pause.png";
import borgLogo from "../public/borg-icon.png";

function App() {
  const [isFullScreen, setFullScreen] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [hasVideoPlayed, setHasVideoPlayed] = useState(false);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
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

  const [playbarClicked, setPlaybarClicked] = useState(false);
  const [intervalCleared, setIntervalCleared] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const togglePlayPause = () => {
    if (intervalCleared) {
      setDisplayedText("");
      setIntervalCleared(false);
      setTimer(0);
      setPlaying(!isPlaying);
      setHasVideoPlayed(true);
    }
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
  }, [isPlaying, timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const remainingSeconds = Math.round(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div
      className={`AppDiv flex ${
        isFullScreen ? "w-screen h-screen mt-0" : "w-[55vw] h-[70vh] mt-[15vh]"
      } flex-col gap-2 bg-gray-950 overflow-auto relative`}
    >
      {!hasVideoPlayed && !isPlaying && (
        <PlayButton togglePlayPause={togglePlayPause} playImage={playImage} />
      )}

      {hasVideoPlayed && (
        <TitleLogo isFullScreen={isFullScreen} borgLogo={borgLogo} />
      )}

      <Terminal
        setPlaying={setPlaying}
        isPlaying={isPlaying}
        isFullScreen={isFullScreen}
        timer={timer}
        setTimer={setTimer}
        togglePlayPause={togglePlayPause}
        hasVideoPlayed={hasVideoPlayed}
        setPlaybarClicked={setPlaybarClicked}
        playbarClicked={playbarClicked}
        setIntervalCleared={setIntervalCleared}
        setDisplayedText={setDisplayedText}
        displayedText={displayedText}
      />

      <VideoBar
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        formatTime={formatTime}
        setTimer={setTimer}
        timer={timer}
        toggleFullScreen={toggleFullScreen}
        isFullScreen={isFullScreen}
        pauseImage={pauseImage}
        playImage={playImage}
        minimizeImage={minimizeImage}
        fullScreen={fullScreen}
        setPlaybarClicked={setPlaybarClicked}
      />
    </div>
  );
}

export default App;
