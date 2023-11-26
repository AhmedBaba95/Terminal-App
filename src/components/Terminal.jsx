import React, { useState, useEffect, useRef } from "react";
import terminalData from "./TerminalData";
import "./Terminal.css";
import { timeInterval } from "rxjs";

const Terminal = ({
  isPlaying,
  setPlaying,
  isFullScreen,
  timer,
  setTimer,
  playbarClicked,
  setPlaybarClicked,
  setIntervalCleared,
  displayedText,
  setDisplayedText,
  typingInterval,
}) => {
  const [textIndex, setTextIndex] = useState(0);
  const terminalRef = useRef();

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (textIndex < terminalData.length) {
          setDisplayedText((prevText) => prevText + terminalData[textIndex]);
          setTextIndex((prevIndex) => prevIndex + 1);
        } else {
          setPlaying(false);
          setTextIndex(0);
          clearInterval(interval); // Clear interval when writing is complete
          setIntervalCleared(true);
        }
      }, typingInterval);

      return () => clearInterval(interval);
    }
  }, [isPlaying, timer, textIndex, setPlaying, setTimer]);

  // Synchronize text when the timer changes or playbar is clicked
  useEffect(() => {
    if (playbarClicked) {
      synchronizeText(timer);
      setPlaybarClicked(false); // Reset the playbarClicked state
    }
  }, [timer, playbarClicked, setPlaybarClicked]);

  // Function to synchronize text with the progress
  const synchronizeText = (currentTimer) => {
    const newTextIndex = Math.floor(
      (currentTimer / ((terminalData.length * typingInterval) / 1000)) *
        terminalData.length
    );

    // Include all characters from the beginning to the current textIndex
    const textToShow = terminalData.substring(0, newTextIndex);

    setDisplayedText(textToShow);
    setTextIndex(newTextIndex);
  };

  useEffect(() => {
    // Scroll the terminal to the bottom when displayedText changes
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [displayedText]);

  return (
    <div
      ref={terminalRef}
      className={`terminal ${
        isFullScreen ? "w-screen h-[87%] px-4" : "w-[55vw] h-[60vh] px-2 "
      } overflow-x-hidden overflow-y-auto`}
    >
      <pre
        className={`text-gray-300 ${
          isFullScreen ? "text-xl" : "text-xs"
        } max-h-full whitespace-pre-wrap`}
      >
        {displayedText.split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </pre>
    </div>
  );
};

export default Terminal;
