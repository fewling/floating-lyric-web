export interface ArticleLink {
  label: string;
  href: string;
  download?: boolean;
}
export interface Article {
  eyebrow: string;
  title: string;
  intro: string;
  description: string;
  notice?: string;
  sections: {
    id: string;
    title: string;
    paragraphs?: string[];
    steps?: string[];
    items?: string[];
    code?: string;
    links?: ArticleLink[];
  }[];
}

const supportEmail = "floatinglyricsapp@gmail.com";

export const setupArticle: Article = {
  eyebrow: "Getting started",
  title: "Your first lyrics window.",
  intro: "Keep listening in your music app. Floating Lyrics brings the lyrics alongside it.",
  description:
    "Set up Floating Lyrics on Android, understand notification and overlay permissions, and troubleshoot missing or out-of-sync lyrics.",
  sections: [
    {
      id: "permissions",
      title: "Give the window a place to work.",
      paragraphs: [
        "Notification access lets Floating Lyrics detect your music app and follow its playback information. It is a separate Android setting from permission to send notifications.",
        "Display over other apps allows the lyrics window to appear while another app is on screen. Android may use a different name for this permission on your phone.",
      ],
      steps: [
        "Open Floating Lyrics and choose Grant Access for notification access. Select Floating Lyrics in Android settings and enable Allow notification access.",
        "Return to Floating Lyrics. Choose Grant Access for the overlay permission, then enable Allow display over other apps for Floating Lyrics.",
        "Return to the app and choose Done once both permissions are enabled.",
      ],
    },
    {
      id: "playback",
      title: "Start with a song you know.",
      paragraphs: [
        "Start playback in your music app, then return to Floating Lyrics. Check that the detected song title and artist match what is playing. Floating Lyrics is a companion to your music app; playback stays in that app.",
        "Synchronized lyrics use timestamps to follow playback position. The highlighted line represents the current lyric line, rather than a word-by-word karaoke effect. A matching timed lyric file is needed for the song and recording.",
        "The Play listing describes online lyric lookup as experimental. A song may have no available lyrics, or a result may belong to a different recording. Import an LRC file when you have your own timed lyrics.",
      ],
      links: [{ label: "Import your LRC files", href: "/lrc" }],
    },
    {
      id: "troubleshooting",
      title: "When something is missing.",
      items: [
        "No music detected: confirm playback is active and your music app exposes playback information through Android. Recheck notification access. The source includes a Not detecting active music player? option to re-enable the notification listener.",
        "No lyrics window: recheck display-over-other-apps permission. Look for the window controls in Floating Lyrics.",
        "Wrong or missing lyrics: check the detected title and artist, then try a matching LRC file. Lyric availability and player compatibility vary; every track and music app is not guaranteed to work.",
        "Lyrics ahead or behind: check that the file matches the exact recording, including live versions, remasters and introductory silence. Timestamps for a different recording will not align reliably.",
        "Stops in the background: review your phone’s battery and background-app restrictions. Manufacturer customizations can interrupt music detection even after permissions are granted. Settings differ by phone.",
      ],
      links: [{ label: "Get help with your setup", href: "/support" }],
    },
    {
      id: "appearance",
      title: "Make room for the words.",
      paragraphs: [
        "The Play listing describes lyric colour and transparency controls. The source groups window settings under Window Configs. Choose a readable contrast against the apps you use, then check the window while music is playing.",
      ],
      links: [{ label: "Back to Floating Lyrics", href: "/" }],
    },
  ],
};

const lrcExample = `[ti:Small Hours]
[ar:Floating Lyrics]
[00:00.000]The city settles into blue
[00:04.000]A little light comes drifting through
[00:08.000]We take the long way home tonight
[00:12.000]And keep the quiet in our sight`;

export const lrcArticle: Article = {
  eyebrow: "LRC guide",
  title: "Your lyrics. Right on time.",
  intro: "Bring your own synchronized lyric files to Floating Lyrics.",
  description:
    "Learn how to prepare and import timed LRC files into Floating Lyrics, match song metadata, and troubleshoot lyric timing.",
  sections: [
    {
      id: "format",
      title: "A small file with a sense of timing.",
      paragraphs: [
        "An LRC file is a text file that pairs lyric lines with timestamps. A timestamp such as [00:04.000] means four seconds into the recording. Floating Lyrics uses these times alongside your music app’s playback position to choose the current line.",
        "Keep the .lrc extension and use title and artist tags to describe the song. You can also name the file Title - Artist.lrc or Artist - Title.lrc. Match the spelling and artist information reported by your music app.",
      ],
    },
    {
      id: "example",
      title: "Start with a few lines.",
      paragraphs: [
        "This short example contains original lyrics written for this website. You may copy, edit and reuse them. It is a format example; no audio recording is included, so it will not automatically match a song in your music library.",
      ],
      code: lrcExample,
      links: [
        {
          label: "Download the original LRC example",
          href: "/samples/Small Hours - Floating Lyrics.lrc",
          download: true,
        },
      ],
    },
    {
      id: "import",
      title: "Bring the file into Floating Lyrics.",
      steps: [
        "Save your .lrc file somewhere you can find on your Android phone, such as Downloads.",
        "Open Floating Lyrics and choose Import Lyrics. Review the title and artist shown in the import guidance while your song is playing.",
        "Choose Import, then select your .lrc file in the Android file picker. Wait for importing to finish.",
        "Play the matching song in your music app. Check the detected title and artist, then check that the lyrics window follows playback.",
      ],
      links: [{ label: "Check Android permissions", href: "/setup" }],
    },
    {
      id: "matching",
      title: "The right words need the right recording.",
      paragraphs: [
        "Use timestamps made for the exact recording you are playing. A live performance, radio edit or remaster can have a different opening or arrangement, even when the title and artist are the same.",
        "If the file does not import, check that it is a plain-text .lrc file with valid timestamps and actual lyric lines. Renaming a PDF or a web page to .lrc does not convert it.",
        "If the file imports but does not appear for a song, compare its title and artist tags or filename with the detected playback information. If every line is early or late, review the timestamps against that recording. Importing cannot create timing information for untimed text.",
      ],
      links: [
        { label: "Ask for import help", href: "/support" },
        { label: "Explore Floating Lyrics", href: "/" },
      ],
    },
  ],
};

export const privacyArticle: Article = {
  eyebrow: "Privacy",
  title: "Know what you’re sharing.",
  intro: "Permissions, the app’s privacy policy, and how to get in touch.",
  description:
    "Read about Floating Lyrics permissions, find the app’s published privacy policy, and request privacy or account-deletion help.",
  sections: [
    {
      id: "app-policy",
      title: "The app’s published policy.",
      paragraphs: [
        "Floating Lyrics is an Android app by Felix Wong. Its Google Play listing links to the privacy policy below. Read that policy for the app’s description of personal information, usage data, service providers and your rights.",
        "Permissions alone do not describe every data practice. Features that use online services or an account may involve information beyond what is stored on your phone. Contact support if you need clarification about a particular feature.",
      ],
      links: [
        {
          label: "Read the app privacy policy",
          href: "https://www.freeprivacypolicy.com/live/07b620af-c36c-429e-85ab-f2e666a94135",
        },
      ],
    },
    {
      id: "permissions",
      title: "Two permissions with specific jobs.",
      paragraphs: [
        "Notification access allows the app to detect music playback information. Display-over-other-apps permission allows a lyrics window to remain visible over another app. Android controls both permissions, and you can review or revoke them in your phone’s settings.",
        "Revoking access can prevent music detection or stop the lyrics window from appearing. The setup guide explains why each permission is requested.",
      ],
      links: [{ label: "Understand setup permissions", href: "/setup" }],
    },
    {
      id: "website",
      title: "When you visit this website.",
      paragraphs: [
        "This website adds no analytics trackers, advertising scripts or account system. Following a Google Play, GitHub or privacy-policy link takes you to that provider’s service, where its own policies apply. Website hosting can process connection information needed to serve pages.",
        "Sending a support email shares your email address and the information you choose to include. Share only the details needed to explain your question.",
      ],
    },
    {
      id: "requests",
      title: "Questions and deletion requests.",
      paragraphs: [
        "For privacy questions, email floatinglyricsapp@gmail.com. If you use a Floating Lyrics account, the support page explains how to request account deletion. Do not include your password in an email.",
      ],
      links: [
        { label: "Account deletion and support", href: "/support#account-deletion" },
        {
          label: "Email a privacy question",
          href: `mailto:${supportEmail}?subject=Floating%20Lyrics%20privacy%20question`,
        },
      ],
    },
  ],
};

export const supportArticle: Article = {
  eyebrow: "Support",
  title: "Let’s get you listening.",
  intro: "Find a guide, tell us what happened, or request account deletion.",
  description:
    "Get Floating Lyrics setup and LRC import help, contact support, find alternative downloads, or request account deletion.",
  sections: [
    {
      id: "guides",
      title: "A good place to start.",
      paragraphs: [
        "For a missing lyrics window or music detection problem, begin with Android permissions and playback setup. For your own lyric collection, the LRC guide covers file format, importing and matching.",
      ],
      links: [
        { label: "Set up your lyrics window", href: "/setup" },
        { label: "Import LRC files", href: "/lrc" },
      ],
    },
    {
      id: "contact",
      title: "Tell us what you’re seeing.",
      paragraphs: [
        "Email floatinglyricsapp@gmail.com for help. Include your phone model, Android version, Floating Lyrics version, music app, and a short description of what you expected and what happened.",
        "For a lyric problem, include the song title, artist, recording version and whether you imported an LRC file. A screenshot can help; hide personal information before sending it. Never send passwords or sign-in codes.",
      ],
      links: [
        {
          label: "Email Floating Lyrics support",
          href: `mailto:${supportEmail}?subject=Floating%20Lyrics%20support`,
        },
      ],
    },
    {
      id: "account-deletion",
      title: "Request account deletion.",
      paragraphs: [
        "If you created a Floating Lyrics account, email floatinglyricsapp@gmail.com from the email address associated with that account. Use the subject Floating Lyrics account deletion and state that you want your account and associated personal data deleted.",
        "If you can no longer access that email address, explain this in your request so support can help verify account ownership. Do not send a password. Ask support to clarify any data that must be retained and the expected completion time.",
        "Uninstalling the app is separate from deleting an account. For information about data handling and deletion rights, read the published app privacy policy.",
      ],
      links: [
        {
          label: "Email an account deletion request",
          href: `mailto:${supportEmail}?subject=Floating%20Lyrics%20account%20deletion`,
        },
        { label: "Read privacy information", href: "/privacy" },
      ],
    },
    {
      id: "downloads",
      title: "Another way to download.",
      paragraphs: [
        "Google Play is the primary installation route. An official GitHub release mirror is available if you need an alternative. Check the release notes and Android installation requirements before choosing an APK.",
      ],
      links: [
        {
          label: "Get Floating Lyrics on Google Play",
          href: "https://play.google.com/store/apps/details?id=com.floating.lyrics",
        },
        {
          label: "View official GitHub releases",
          href: "https://github.com/fewling/flutter-floating-lyric-releases/releases",
        },
        { label: "Back to Floating Lyrics", href: "/" },
      ],
    },
  ],
};
