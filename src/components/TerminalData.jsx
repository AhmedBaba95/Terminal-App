const terminalData = `
$ # This asciinema will show you the installation of borg as a standalone binary. Usually you only need this if you want to have an up-to-date version of borg or no package is available for your distro/OS.
$ # First, we need to download the version, we'd like to install…
$ wget -q --show-progress https://github.com/borgbackup/borg/releases/download/1.1.0b6/borg-linux64
$ # and do not forget the GPG signature…!
$ wget -q --show-progress https://github.com/borgbackup/borg/releases/download/1.1.0b6/borg-linux64.asc
$ # In this case, we have already imported the public key of a borg developer. So we only need to verify it:
$ gpg --verify borg-linux64.asc
  gpg: assuming signed data in 'borg-linux64'
  gpg: Signature made Sun Jun 18 16:54:19 2017 CEST
  gpg: using RSA key 0x243ACFA951F78E01
  gpg: Good signature from 'Thomas Waldmann <tw@waldmann-edv.de>' [ultimate]
  gpg: aka 'Thomas Waldmann <tw-public@gmx.de>' [ultimate]
  gpg: aka 'Thomas Waldmann <twaldmann@thinkmo.de>' [ultimate]
  gpg: aka 'Thomas Waldmann <thomas.j.waldmann@gmail.com>' [ultimate]
  Primary key fingerprint: 6D5B EF9A DD20 7580 5747 B70F 9F88 FB52 FAF7 B393
  Subkey fingerprint: 2F81 AFFB AB04 E11F E8EE 65D4 243A CFA9 51F7 8E01
$ # Okay, the binary is valid!
$ # Now install it:
$ sudo cp borg-linux64 /usr/local/bin/borg\n[sudo] password for rugk:
$ sudo chown root:root /usr/local/bin/borg
$ # and make it executable…
$ sudo chmod 755 /usr/local/bin/borg
$ # Now check it: (possibly needs a terminal restart)
$ borg -V
borg 1.1.0b6
$ # That's it! Check out the other screencasts to see how to actually use borg backup.
`;

export default terminalData;
