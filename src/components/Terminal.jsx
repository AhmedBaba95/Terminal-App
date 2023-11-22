import React, { useState, useEffect, useRef } from "react";

export const terminalLinesData = [
  "$ # This asciinema will show you the installation of borg as a standalone binary. Usually you only need this if you want to have an up-to-date version of borg or no package is available for your distro/OS.\n",
  "$ # First, we need to download the version, we'd like to install…\n",
  "$ wget -q --show-progress\nhttps://github.com/borgbackup/borg/releases/download/1.1.0b6/borg-linux64\n",
  "$ # and do not forget the GPG signature…!\n",
  "$ wget -q --show-progress\nhttps://github.com/borgbackup/borg/releases/download/1.1.0b6/borg-linux64.asc\n",
  "$ # In this case, we have already imported the public key of a borg developer. So we only need to verify it:\n",
  "$ gpg --verify borg-linux64.asc\n",
  "  gpg: assuming signed data in 'borg-linux64'\n",
  "  gpg: Signature made Sun Jun 18 16:54:19 2017 CEST\n",
  "  gpg: using RSA key 0x243ACFA951F78E01\n",
  "  gpg: Good signature from 'Thomas Waldmann <tw@waldmann-edv.de>' [ultimate]\n",
  "  gpg: aka 'Thomas Waldmann <tw-public@gmx.de>' [ultimate]\n",
  "  gpg: aka 'Thomas Waldmann <twaldmann@thinkmo.de>' [ultimate]\n",
  "  gpg: aka 'Thomas Waldmann <thomas.j.waldmann@gmail.com>' [ultimate]\n",
  "  Primary key fingerprint: 6D5B EF9A DD20 7580 5747 B70F 9F88 FB52 FAF7 B393\n",
  "  Subkey fingerprint: 2F81 AFFB AB04 E11F E8EE 65D4 243A CFA9 51F7 8E01\n",
  "$ # Okay, the binary is valid!\n",
  "$ # Now install it:\n",
  "$ sudo cp borg-linux64 /usr/local/bin/borg\n[sudo] password for rugk:\n",
  "$ sudo chown root:root /usr/local/bin/borg\n",
  "$ # and make it executable…\n",
  "$ sudo chmod 755 /usr/local/bin/borg\n",
  "$ # Now check it: (possibly needs a terminal restart)\n",
  "$ borg -V\n",
  "borg 1.1.0b6\n",
  "$ # That's it! Check out the other screencasts to see how to actually use borg backup.\n",
];

const Terminal = ({ isPlaying, setPlaying, isFullScreen, timer, setTimer }) => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const typingInterval = 45; // Adjust the typing speed (milliseconds)
  const maxLines = 17; // Adjust this value based on how many lines you want to display

  const terminalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (textIndex < terminalLinesData.length) {
          const currentText = terminalLinesData[textIndex];

          setCurrentLine((prevLine) => {
            const nextChar = currentText[prevLine.length];
            return prevLine + (nextChar === undefined ? "" : nextChar);
          });

          if (currentLine.length === currentText.length) {
            setLines((prevLines) =>
              [...prevLines, currentLine].slice(-maxLines)
            );
            setCurrentLine("");
            setTextIndex((prevIndex) => prevIndex + 1);
          }
        } else {
          // Check if the timer is finished, and reset if needed
          if (timer > 87) {
            setTimer(0);
            setTextIndex(0);
            setPlaying(false);
            setLines([]);
          }
          clearInterval(interval); // Clear interval when writing is complete
        }
      }, typingInterval);

      return () => clearInterval(interval);
    }
  }, [isPlaying, textIndex, currentLine, timer]);

  useEffect(() => {
    if (isFullScreen) {
      // Scroll to the bottom when in full screen mode
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [isFullScreen, lines]);

  return (
    <div
      ref={terminalRef}
      className={`terminal ${
        isFullScreen ? "w-screen h-screen p-5" : "w-[55vw] h-[70vh] p-2"
      } overflow-hidden`}
    >
      <pre
        className={`text-gray-300 ${
          isFullScreen ? "text-xl" : "text-xs"
        } max-h-full whitespace-pre-wrap`}
      >
        {lines}
        {currentLine}
      </pre>
    </div>
  );
};

export default Terminal;
