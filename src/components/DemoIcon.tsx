import type { ReactNode } from "react";

type IconName =
  | "play"
  | "pause"
  | "previous"
  | "next"
  | "settings"
  | "close"
  | "lock"
  | "resize-left"
  | "resize-right"
  | "music"
  | "grip";
const artwork: Record<IconName, ReactNode> = {
  play: <path d="m9 5 10 7-10 7Z" fill="currentColor" stroke="none" />,
  pause: (
    <>
      <path d="M8 5v14M16 5v14" strokeWidth="3" />
    </>
  ),
  previous: (
    <>
      <path d="M6 6v12" />
      <path d="m18 6-9 6 9 6Z" fill="currentColor" stroke="none" />
    </>
  ),
  next: (
    <>
      <path d="M18 6v12" />
      <path d="m6 6 9 6-9 6Z" fill="currentColor" stroke="none" />
    </>
  ),
  settings: (
    <>
      <path d="M4 6h7m5 0h4M4 12h2m5 0h9M4 18h10m5 0h1" />
      <path d="M13 3v6M8 9v6m8 0v6" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  lock: (
    <>
      <rect x="6" y="10" width="12" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  "resize-left": <path d="M5 8a11 11 0 0 0 11 11" />,
  "resize-right": <path d="M19 8A11 11 0 0 1 8 19" />,
  grip: (
    <>
      <circle cx="9" cy="6" r="1" />
      <circle cx="15" cy="6" r="1" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="9" cy="18" r="1" />
      <circle cx="15" cy="18" r="1" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l11-2v13M9 8l11-2" />
      <ellipse cx="6" cy="18" rx="3" ry="2" />
      <ellipse cx="17" cy="16" rx="3" ry="2" />
    </>
  ),
};
export function DemoIcon({ name }: { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {artwork[name]}
    </svg>
  );
}
