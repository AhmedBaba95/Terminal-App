import React, { useState, useEffect, useRef } from "react";
import terminalData from "./TerminalData";
import "./Terminal.css";

const Terminal = ({ isPlaying, setPlaying, isFullScreen, timer, setTimer }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const terminalRef = useRef();

  const typingInterval = 45;

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (textIndex < terminalData.length) {
          setDisplayedText((prevText) => prevText + terminalData[textIndex]);
          setTextIndex((prevIndex) => prevIndex + 1);
        } else {
          setTimer(0);
          setTextIndex(0);
          setPlaying(false);
          setDisplayedText("");
          clearInterval(interval); // Clear interval when writing is complete
        }
      }, typingInterval);

      return () => clearInterval(interval);
    }
  }, [isPlaying, timer, textIndex, setPlaying, setTimer]);

  useEffect(() => {
    // Scroll the terminal to the bottom when displayedText changes
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [displayedText]);

  return (
    <div
      ref={terminalRef}
      className={`terminal ${
        isFullScreen ? "w-screen h-screen p-5" : "w-[55vw] h-[64vh] p-2"
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
