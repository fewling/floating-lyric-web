import type { ProsePage } from "@/types/content";
import { siteConfig } from "./site";

export const setupContent: ProsePage = {
  title: "Setup & troubleshooting",
  sections: [
    {
      heading: "Before you start",
      paragraphs: [
        "Floating Lyrics displays a lyrics window while your music app plays the audio. Keep using your music app to choose and play songs.",
        "Music detection depends on your music app sharing an Android media session: the track information and playback state that Floating Lyrics reads. Compatibility depends on the music app and device; a music notification alone does not guarantee that every track will work.",
      ],
      links: [{ label: "Install Floating Lyrics on Google Play", href: siteConfig.playStoreUrl }],
    },
    {
      heading: "1. Allow notification access",
      paragraphs: [
        "Open Floating Lyrics. On the Notification Listener Permission screen, tap Grant Access, select Floating Lyrics in Android settings, and turn on Allow notification access. Return to Floating Lyrics.",
        "This access lets Floating Lyrics detect the music app and read its track and playback information. It is different from permission to send notifications.",
      ],
    },
    {
      heading: "2. Allow the lyrics window over other apps",
      paragraphs: [
        "Continue to Overlay Window Permission and tap Grant Access. Select Floating Lyrics in Android settings and turn on Allow display over other apps. Return to Floating Lyrics and tap Done after both permissions are enabled.",
        "This permission lets the lyrics window appear while you use another app. Android settings names and screen layouts can vary by device.",
      ],
    },
    {
      heading: "3. Play music and show the lyrics window",
      paragraphs: [
        "Start a song in your music app, then return to Floating Lyrics and check that the track is detected. In Window Configs, tap Show to open the lyrics window. Switch to another app to continue reading while you listen.",
        "With synchronized lyrics available, the current line follows the music app’s playback position. This is line synchronization; it does not promise word-by-word highlighting.",
      ],
    },
    {
      heading: "Missing lyrics or no music detected?",
      paragraphs: [
        "First check whether Floating Lyrics shows the correct track title and artist. If no music is detected, confirm that a song is playing and that notification access is still enabled. On the home screen, tap Not detecting active music player? to re-enable the notification listener, then check again.",
        "If the track is detected but lyrics are missing, check your internet connection when looking up online lyrics. A matching lyric may not be available for every recording, language, live version, or remix. Track information supplied by the music app affects the match.",
        "You can also use a synchronized LRC file that matches your recording. Importing a file does not change which music app plays the audio.",
      ],
      links: [{ label: "Read the LRC import guide", href: "/lrc/" }],
    },
    {
      heading: "Lyrics out of sync?",
      paragraphs: [
        "Check that the detected track and the lyric belong to the same recording. A live performance, remix, or different edit can have different timings even when the title is similar.",
        "Line synchronization needs both timed lyrics and playback information from the music app. Plain lyrics have no line timestamps. If the position shown by the music app is wrong or stops updating, check playback there and reopen Floating Lyrics. Include these details when contacting support if the problem continues.",
      ],
    },
    {
      heading: "Music detection stops in the background?",
      paragraphs: [
        "Some Android devices restrict background services through battery or memory management. This can stop the notification listener after you close the app; reliable background operation varies by device.",
        "Reopen Floating Lyrics and use Not detecting active music player? to re-enable the notification listener. Check your device’s background and battery settings for Floating Lyrics if the issue repeats. The available settings depend on the manufacturer.",
      ],
    },
    {
      heading: "Still need help?",
      paragraphs: [
        "Tell support your Android version, device model, Floating Lyrics version, music app, and the affected track and recording. Describe whether the problem is detection, missing lyrics, timing, or the lyrics window disappearing. A screenshot can help; remove any personal information first.",
      ],
      links: [
        { label: "Contact support", href: "/support/" },
        { label: "About Floating Lyrics", href: "/" },
      ],
    },
  ],
};
