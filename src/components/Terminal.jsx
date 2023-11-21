import React, { useState, useEffect } from "react";

const Terminal = ({ isPlaying }) => {
  const [terminalText, setTerminalText] = useState("");
  const textToType =
    "$ # This asciinema will show you the installation of borg as a standalone binary. Usually you only need this if you want to have an up-to-date version of borg or no package is available for your distro/OS.\n" +
    "$ # First, we need to download the version, we'd like to install…\n" +
    "$ wget -q --show-progress https://github.com/borgbackup/borg/releases/download/1.1.0b6/borg-linux64\n" +
    "$ # and do not forget the GPG signature…!\n" +
    "$ wget -q --show-progress https://github.com/borgbackup/borg/releases/download/1.1.0b6/borg-linux64.asc\n" +
    "$ # In this case, we have already imported the public key of a borg developer. So we only need to verify it:\n" +
    "$ gpg --verify borg-linux64.asc\n" +
    "gpg: assuming signed data in `borg-linux64'\n" +
    "gpg: Signature made Sun Jun 18 16:54:19 2017 CEST\n" +
    "gpg:                using RSA key 0x243ACFA951F78E01\n" +
    'gpg: Good signature from "Thomas Waldmann <tw@waldmann-edv.de>" [ultimate]\n' +
    'gpg:                 aka "Thomas Waldmann <tw-public@gmx.de>" [ultimate]\n' +
    'gpg:                 aka "Thomas Waldmann <twaldmann@thinkmo.de>" [ultimate]\n' +
    'gpg:                 aka "Thomas Waldmann <thomas.j.waldmann@gmail.com>" [ultimate]\n' +
    "Primary key fingerprint: 6D5B EF9A DD20 7580 5747  B70F 9F88 FB52 FAF7 B393\n" +
    "Subkey fingerprint: 2F81 AFFB AB04 E11F E8EE  65D4 243A CFA9 51F7 8E01\n" +
    "$ # Okay, the binary is valid!\n";

  useEffect(() => {
    if (isPlaying) {
      let i = 0;
      const interval = setInterval(() => {
        setTerminalText((prevText) => prevText + textToType[i]);
        i++;
        if (i === textToType.length) {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isPlaying, textToType]);

  return (
    <div className="terminal w-[55vw] p-1">
      <pre className="text-gray-300 max-w-[54vw] whitespace-pre-wrap">
        {terminalText}
      </pre>
    </div>
  );
};

export default Terminal;
