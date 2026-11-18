import type { ProsePage } from "@/types/content";
import { siteConfig } from "./site";

export const lrcContent: ProsePage = {
  title: "LRC import guide",
  sections: [
    {
      heading: "What a synchronized LRC file does",
      paragraphs: [
        "An LRC file is a text file with lyrics and line timestamps. For example, [00:05.00] means that a line starts five seconds into the recording. Timed lines let Floating Lyrics follow the playback position in its lyrics window; they do not provide word-by-word karaoke highlighting.",
        "Your music app plays the audio. Floating Lyrics reads the track and playback information shared through Android’s media session and displays the matching lyrics. An LRC file contains no audio and does not turn Floating Lyrics into a music player.",
      ],
      links: [{ label: "Install Floating Lyrics on Google Play", href: siteConfig.playStoreUrl }],
    },
    {
      heading: "1. Prepare a file that matches your recording",
      paragraphs: [
        "Use a synchronized .lrc file for the exact version you listen to. A live performance, remix, or shorter edit may need different timestamps from the album version.",
        "Start the track in your music app and check the title and artist detected by Floating Lyrics. In Import Lyrics, the app shows matching formats using those details: Title - Artist.lrc or Artist - Title.lrc. You can also identify the song inside the file with [ti:Title] and [ar:Artist]. Use the detected title and artist rather than guessing from an audio file’s name.",
      ],
    },
    {
      heading: "2. Import the LRC file",
      paragraphs: [
        "Open Floating Lyrics, select the Import Lyrics tab, and tap Import. In Android’s file picker, find and select your .lrc file. Follow any import confirmation shown by the app, and check the result before leaving the screen.",
        "Keep the .lrc extension when saving a text file: a file named song.lrc.txt is still a .txt file. If import fails, check that the file contains lyric lines with timestamps rather than a web page or an empty file.",
      ],
    },
    {
      heading: "Try an original example",
      paragraphs: [
        "Download First Light, an original four-line practice LRC file created for this guide. It contains title and artist tags and lines at 0, 5, 10, and 15 seconds. No audio recording is included, so it will not automatically match a song in your library.",
        "Open the example in a text editor to see the format. To make your own practice file, replace the title, artist, words, and timestamps with details for a recording you are allowed to use, then save it with a .lrc extension. The example’s timings are for practice, not a timing reference for another song.",
      ],
      links: [
        {
          label: "Download the original example LRC file",
          href: "/examples/First%20Light%20-%20Floating%20Lyrics.lrc",
        },
      ],
    },
    {
      heading: "3. Read lyrics while the track plays",
      paragraphs: [
        "Play the matching recording in your music app and check that Floating Lyrics detects the correct title and artist. In Window Configs, tap Show to open the lyrics window, then switch to another app. Notification access and display-over-other-apps permission must be enabled; the setup guide explains both.",
        "If the wrong lyrics appear or the lines are out of sync, compare the detected track information, the file’s title and artist, and the recording’s timings. A successful import alone does not establish that the lyrics match the playing track.",
      ],
      links: [{ label: "Follow the setup and troubleshooting guide", href: "/setup/" }],
    },
    {
      heading: "Need help with a file?",
      paragraphs: [
        "Tell support the app version, Android version, music app, detected track title and artist, file name, and whether the problem is importing, matching, or timing. Share a short example only if you have permission to share its contents.",
      ],
      links: [
        { label: "Contact support", href: "/support/" },
        { label: "About Floating Lyrics", href: "/" },
      ],
    },
  ],
};
