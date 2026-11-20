"use client";

import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
  type ReactNode,
  type CSSProperties,
} from "react";
import { DemoIcon } from "./DemoIcon";
import { demo, cueAt, clock } from "@/content/demo";

type Playback = "ready" | "loading" | "playing" | "paused" | "buffering" | "ended" | "error";
type Mode = "closed" | "floating" | "bubble";
type Rect = { x: number; y: number; width: number; height: number };
type Gesture = {
  pointer: number;
  target: HTMLElement;
  x: number;
  y: number;
  rect: Rect;
  kind: "move" | "left" | "right";
  moved: boolean;
  threshold: number;
};
type DemoContext = {
  start: () => void;
  playing: boolean;
};
const Context = createContext<DemoContext | null>(null);
export function useLyricsDemo() {
  return useContext(Context);
}
export function DemoStart({
  className = "",
  descriptionId,
}: {
  className?: string;
  descriptionId?: string;
}) {
  const state = useLyricsDemo();
  return (
    <button
      className={`demo-start ${className}`}
      aria-describedby={descriptionId}
      onClick={() => state?.start()}
    >
      <DemoIcon name={state?.playing ? "pause" : "play"} />{" "}
      {state?.playing ? "Pause demo" : "Play demo"}
    </button>
  );
}

export function LyricsDemoProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const card = useRef<HTMLElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const settingsButton = useRef<HTMLButtonElement>(null);
  const settingsPanel = useRef<HTMLDivElement>(null);
  const bodyButton = useRef<HTMLButtonElement>(null);
  const [playback, setPlayback] = useState<Playback>("ready");
  const [mode, setMode] = useState<Mode>("floating");
  const dark = demo.theme === "dark";
  const [opacity, setOpacity] = useState(demo.opacity);
  const [fontSize, setFontSize] = useState(demo.fontSize);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(demo.duration);
  const [preview, setPreview] = useState<number | null>(null);
  const [chrome, setChrome] = useState(true);
  const [settings, setSettings] = useState(false);
  const [offset, setOffset] = useState(0);
  const [rect, setRect] = useState<Rect>({ x: 16, y: 100, width: 336, height: 260 });
  const [positioned, setPositioned] = useState(false);
  const geometry = useRef(rect);
  const gesture = useRef<Gesture | null>(null);
  const suppressClick = useRef(false);
  const modeRef = useRef(mode);
  const chromeRef = useRef(chrome);
  const started = useRef(false);
  const wantsPlayback = useRef(false);
  const expanded = useRef<Rect | null>(null);
  const seekActive = useRef(false);
  const previousCue = useRef<number | null>(null);
  const lastSeekAt = useRef(0);
  const [activeGesture, setActiveGesture] = useState<Gesture["kind"] | null>(null);
  function stopReadingMotion() {
    bodyButton.current?.querySelectorAll(".demo-current-line, .demo-next-line").forEach((line) => {
      line.getAnimations().forEach((animation) => animation.cancel());
    });
  }
  useEffect(() => {
    modeRef.current = mode;
    chromeRef.current = chrome;
  }, [mode, chrome]);

  function viewport() {
    const v = window.visualViewport;
    return {
      left: v?.offsetLeft ?? 0,
      top: (v?.offsetTop ?? 0) + 80,
      width: v?.width ?? window.innerWidth,
      height: (v?.height ?? window.innerHeight) - 80,
    };
  }
  function bounded(
    next: Rect,
    visibleChrome = chromeRef.current,
    bubble = modeRef.current === "bubble",
  ) {
    const v = viewport();
    const width = Math.min(next.width, v.width - 24);
    const height = Math.min(next.height, v.height - 24);
    const topCrop = visibleChrome || bubble ? 0 : 44;
    const bottomCrop = visibleChrome || bubble ? 0 : 48;
    const w = bubble ? 48 : width;
    const h = bubble ? 48 : height;
    return {
      width,
      height,
      x: Math.max(v.left + 12, Math.min(v.left + v.width - w - 12, next.x)),
      y: Math.max(v.top + 12 - topCrop, Math.min(v.top + v.height - h - 12 + bottomCrop, next.y)),
    };
  }
  function place(next: Rect) {
    geometry.current = next;
    setRect(next);
    setPositioned(true);
  }
  function cancelGesture() {
    const g = gesture.current;
    gesture.current = null;
    setActiveGesture(null);
    if (g?.target.hasPointerCapture(g.pointer)) g.target.releasePointerCapture(g.pointer);
  }
  function reset() {
    cancelGesture();
    const v = viewport();
    place(
      bounded({ x: v.left + v.width - 348, y: v.top + v.height - 280, width: 336, height: 260 }),
    );
  }
  const initializeWindow = useEffectEvent(() => {
    const stage = document.querySelector("#experience .product-stage")?.getBoundingClientRect();
    if (stage)
      place(
        bounded({
          x: stage.left + stage.width / 2 - 10,
          y: stage.top + 120,
          width: 336,
          height: 260,
        }),
      );
    else reset();
    started.current = true;
  });
  useEffect(() => {
    const frame = requestAnimationFrame(() => initializeWindow());
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const media = audio.current;
    if (!media) return;
    let frame = 0;
    const sync = () => {
      setTime(media.currentTime);
      if (Number.isFinite(media.duration)) setDuration(media.duration);
    };
    const tick = () => {
      sync();
      frame = requestAnimationFrame(tick);
    };
    const playing = () => {
      if (!wantsPlayback.current) {
        media.pause();
        return;
      }
      setPlayback("playing");
      cancelAnimationFrame(frame);
      tick();
    };
    const paused = () => {
      cancelAnimationFrame(frame);
      sync();
      setPlayback(media.error ? "error" : media.ended ? "ended" : "paused");
    };
    const waiting = () => {
      if (!media.paused) setPlayback("buffering");
    };
    const error = () => {
      cancelAnimationFrame(frame);
      setPlayback("error");
    };
    const visibility = () => {
      if (!document.hidden) sync();
    };
    media.addEventListener("playing", playing);
    media.addEventListener("pause", paused);
    media.addEventListener("ended", paused);
    media.addEventListener("waiting", waiting);
    media.addEventListener("error", error);
    for (const name of ["timeupdate", "seeked", "loadedmetadata", "durationchange"])
      media.addEventListener(name, sync);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("playing", playing);
      media.removeEventListener("pause", paused);
      media.removeEventListener("ended", paused);
      media.removeEventListener("waiting", waiting);
      media.removeEventListener("error", error);
      for (const name of ["timeupdate", "seeked", "loadedmetadata", "durationchange"])
        media.removeEventListener(name, sync);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const resizeViewport = useEffectEvent(() => {
    cancelGesture();
    place(bounded(geometry.current));
  });
  useEffect(() => {
    function resize() {
      resizeViewport();
    }
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("scroll", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("scroll", resize);
    };
  }, []);
  useEffect(() => {
    if (!settings) return;
    settingsPanel.current?.querySelector("input")?.focus({ preventScroll: true });
    function escape(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setSettings(false);
        settingsButton.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("keydown", escape);
    };
  }, [settings]);

  async function play() {
    const media = audio.current;
    if (!media) return;
    wantsPlayback.current = true;
    try {
      if (playback === "error") media.load();
      if (media.ended) media.currentTime = 0;
      setPlayback("loading");
      await media.play();
      if (!wantsPlayback.current) media.pause();
    } catch {
      if (wantsPlayback.current) setPlayback("error");
    }
  }
  function pause() {
    wantsPlayback.current = false;
    audio.current?.pause();
    setPlayback("paused");
  }
  function start() {
    if (playback === "playing" || playback === "buffering" || playback === "loading") {
      pause();
      return;
    }
    if (!started.current) {
      reset();
      started.current = true;
    }
    if (mode === "bubble") changeMode("floating");
    else setMode("floating");
    setSettings(false);
    setChrome(true);
    void play();
    if (mode === "closed")
      requestAnimationFrame(() =>
        card.current
          ?.querySelector<HTMLButtonElement>(".demo-play")
          ?.focus({ preventScroll: true }),
      );
  }
  function close() {
    wantsPlayback.current = false;
    audio.current?.pause();
    setMode("closed");
    setSettings(false);
    setPreview(null);
    seekActive.current = false;
  }
  useEffect(() => {
    if (mode === "closed") launcher.current?.focus({ preventScroll: true });
  }, [mode]);
  function toggleChrome() {
    cancelGesture();
    if (!chrome) place(bounded(geometry.current, true));
    setChrome(!chrome);
    setSettings(false);
  }
  function changeMode(next: Mode) {
    cancelGesture();
    setSettings(false);
    if (next === "bubble") expanded.current = geometry.current;
    if (mode === "bubble" && next === "floating" && expanded.current)
      place(bounded(expanded.current, chrome, false));
    setMode(next);
    if (next === "floating" && mode !== "bubble") place(bounded(geometry.current, chrome, false));
    requestAnimationFrame(() =>
      (next === "bubble" ? card.current?.querySelector("button") : bodyButton.current)?.focus({
        preventScroll: true,
      }),
    );
  }
  function seek(value: number) {
    stopReadingMotion();
    lastSeekAt.current = performance.now();
    const media = audio.current;
    if (media && media.readyState >= 1) {
      media.currentTime = Math.max(0, Math.min(duration, value));
      setTime(media.currentTime);
    }
    setPreview(null);
    seekActive.current = false;
  }
  function down(e: PointerEvent<HTMLElement>) {
    if (!gesture.current) suppressClick.current = false;
    if (e.button !== 0 || !e.isPrimary || gesture.current) return;
    const target = e.target;
    if (!(target instanceof Element) || target.closest("input,select,[data-no-move]")) return;
    stopReadingMotion();
    const corner = target.closest("[data-resize]")?.getAttribute("data-resize");
    gesture.current = {
      pointer: e.pointerId,
      target: e.currentTarget,
      x: e.clientX,
      y: e.clientY,
      rect: geometry.current,
      kind: corner === "left" || corner === "right" ? corner : "move",
      moved: false,
      threshold: e.pointerType === "touch" ? 8 : 6,
    };
    if (corner === "left" || corner === "right") setActiveGesture(corner);
    suppressClick.current = false;
  }
  function move(e: PointerEvent<HTMLElement>) {
    const g = gesture.current;
    if (!g || g.pointer !== e.pointerId) return;
    const dx = e.clientX - g.x,
      dy = e.clientY - g.y;
    if (!g.moved && Math.hypot(dx, dy) < g.threshold) return;
    if (!g.moved) {
      g.moved = true;
      setActiveGesture(g.kind);
      g.target.setPointerCapture(e.pointerId);
    }
    suppressClick.current = true;
    if (g.kind === "move") place(bounded({ ...g.rect, x: g.rect.x + dx, y: g.rect.y + dy }));
    else {
      const v = viewport();
      const width = Math.max(
        Math.min(240, v.width - 24),
        Math.min(v.width - 24, g.rect.width + (g.kind === "left" ? -dx : dx)),
      );
      const height = Math.max(
        Math.min(224, v.height - 24),
        Math.min(v.top + v.height - g.rect.y - 12, g.rect.height + dy),
      );
      const x = g.kind === "left" ? g.rect.x + g.rect.width - width : g.rect.x;
      // Preserve the opposite edge when clamping near the viewport.
      const safeWidth =
        g.kind === "left"
          ? Math.min(width, g.rect.x + g.rect.width - v.left - 12)
          : Math.min(width, v.left + v.width - x - 12);
      place({
        x: g.kind === "left" ? g.rect.x + g.rect.width - safeWidth : x,
        y: g.rect.y,
        width: safeWidth,
        height,
      });
    }
  }
  function up(e: PointerEvent<HTMLElement>) {
    const g = gesture.current;
    if (!g || g.pointer !== e.pointerId) return;
    if (g.moved && mode === "bubble") {
      const v = viewport();
      place({
        ...geometry.current,
        x: geometry.current.x < v.left + v.width / 2 ? v.left + 12 : v.left + v.width - 60,
      });
    }
    cancelGesture();
  }
  function keys(e: KeyboardEvent<HTMLElement>, resize?: "left" | "right") {
    if (e.key === "Home") {
      e.preventDefault();
      reset();
      return;
    }
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-20, 0],
      ArrowRight: [20, 0],
      ArrowUp: [0, -20],
      ArrowDown: [0, 20],
    };
    const d = delta[e.key];
    if (!d) return;
    e.preventDefault();
    cancelGesture();
    const r = geometry.current;
    if (!resize) place(bounded({ ...r, x: r.x + d[0], y: r.y + d[1] }));
    else {
      adjustSize(d[0], d[1], resize);
    }
  }
  function adjustSize(dx: number, dy: number, edge: "left" | "right" = "right") {
    cancelGesture();
    const r = geometry.current,
      v = viewport();
    const width = Math.max(
      Math.min(240, v.width - 24),
      Math.min(v.width - 24, r.width + (edge === "left" ? -dx : dx)),
    );
    place(
      bounded({
        ...r,
        width,
        height: Math.max(Math.min(224, v.height - 24), r.height + dy),
        x: edge === "left" ? r.x + r.width - width : r.x,
      }),
    );
  }
  const cueIndex = cueAt(Math.max(0, time + offset));
  const line = demo.cues[cueIndex];
  const next = demo.cues[cueIndex + 1];
  useLayoutEffect(() => {
    const body = bodyButton.current;
    if (!body) return;
    function fit() {
      if (!body) return;
      const style = getComputedStyle(body);
      const horizontal = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const vertical =
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.rowGap);
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;left:0;top:0;width:${body.clientWidth - horizontal}px`;
      // Fit the whole recording once per geometry, so individual lines do not resize the type.
      const groups = ["demo-current-line", "demo-next-line"].map((className) =>
        demo.cues.map((cue) => {
          const span = document.createElement("span");
          span.className = className;
          span.textContent = cue.text;
          probe.append(span);
          return span;
        }),
      );
      body.append(probe);
      let size = fontSize,
        currentHeight = 0,
        nextHeight = 0;
      while (size >= 14) {
        body.style.fontSize = `${size}px`;
        currentHeight = Math.max(...groups[0].map((span) => span.scrollHeight));
        nextHeight = Math.max(...groups[1].map((span) => span.scrollHeight));
        if (currentHeight + nextHeight + vertical <= body.clientHeight || size === 14) break;
        size -= 1;
      }
      body.style.setProperty("--demo-current-height", `${currentHeight}px`);
      body.style.setProperty("--demo-next-height", `${nextHeight}px`);
      probe.remove();
    }
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(body);
    return () => observer.disconnect();
  }, [fontSize, mode, settings]);
  useLayoutEffect(() => {
    const previous = previousCue.current;
    previousCue.current = cueIndex;
    const media = audio.current;
    if (
      previous === null ||
      cueIndex !== previous + 1 ||
      !media ||
      media.paused ||
      media.seeking ||
      gesture.current ||
      seekActive.current ||
      performance.now() - lastSeekAt.current < 300 ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const animations = Array.from(
      bodyButton.current?.querySelectorAll(".demo-current-line, .demo-next-line") ?? [],
    ).map((line) =>
      line.animate([{ transform: "translateY(8px)" }, { transform: "translateY(0)" }], {
        duration: 160,
        easing: "cubic-bezier(.22,1,.36,1)",
      }),
    );
    return () => animations.forEach((animation) => animation.cancel());
  }, [cueIndex]);
  const timelineStyle: CSSProperties & Record<"--demo-progress", string> = {
    "--demo-progress": `${((preview ?? time) / duration) * 100}%`,
  };
  const playing = playback === "playing" || playback === "buffering";
  const open = mode !== "closed";
  const activeRect = positioned
    ? {
        left: rect.x,
        top: rect.y,
        width: mode === "bubble" ? 48 : rect.width,
        height: mode === "bubble" ? 48 : rect.height,
      }
    : { right: 12, bottom: 20, width: "min(336px, calc(100vw - 24px))", height: 260 };

  return (
    <Context.Provider value={{ start, playing: playing || playback === "loading" }}>
      {children}
      <audio ref={audio} preload="none" src={demo.audio} />
      <button ref={launcher} className="demo-launcher" hidden={mode !== "closed"} onClick={start}>
        Play demo
      </button>
      {open && (
        <section
          ref={card}
          aria-label="Floating lyrics demo"
          className={`live-lyrics ${dark ? "demo-dark" : "demo-light"} ${mode === "bubble" ? "demo-bubble" : ""}`}
          aria-describedby="demo-site-boundary"
          data-chrome={chrome}
          data-settings={settings || undefined}
          data-playback={playback}
          data-gesture={activeGesture ?? undefined}
          data-seeking={preview !== null || undefined}
          style={{
            ...activeRect,
            maxWidth: "calc(100vw - 24px)",
            maxHeight: "calc(100dvh - 104px)",
            backgroundColor: dark
              ? `rgb(28 40 37 / ${opacity}%)`
              : `rgb(250 250 248 / ${opacity}%)`,
            clipPath: !chrome && mode !== "bubble" ? "inset(44px 0 48px round 18px)" : undefined,
          }}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onLostPointerCapture={() => {
            gesture.current = null;
            setActiveGesture(null);
          }}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          {mode === "bubble" ? (
            <button
              className="demo-restore"
              aria-label="Restore lyrics window"
              onClick={() => changeMode("floating")}
              onKeyDown={keys}
            >
              <DemoIcon name="music" />
            </button>
          ) : (
            <>
              <header
                className="demo-titlebar"
                style={{ visibility: chrome ? "visible" : "hidden" }}
              >
                <button
                  className="demo-title"
                  aria-label="Move lyrics window. Arrow keys move; Home resets."
                  onKeyDown={keys}
                  title="Drag anywhere to move"
                >
                  <span className="demo-grabmark">
                    <DemoIcon name="grip" />
                  </span>
                  <span className="demo-track">{demo.title}</span>
                  <span className="demo-source">Web demo</span>
                </button>
                <button
                  ref={settingsButton}
                  className="demo-settings-trigger"
                  aria-label={settings ? "Done" : "Lyrics settings"}
                  aria-expanded={settings}
                  aria-controls="demo-settings"
                  onClick={() => setSettings(!settings)}
                >
                  {settings ? (
                    "Done"
                  ) : (
                    <>
                      <DemoIcon name="settings" />
                      <span>Settings</span>
                    </>
                  )}
                </button>
                <button aria-label="Close lyrics demo and pause music" onClick={close}>
                  <DemoIcon name="close" />
                </button>
              </header>
              {settings ? (
                <div
                  ref={settingsPanel}
                  id="demo-settings"
                  className="demo-settings"
                  role="region"
                  data-no-move
                  aria-label="Lyrics settings panel"
                >
                  <div className="demo-setting-actions">
                    <button onClick={() => changeMode("bubble")}>Minimize to bubble</button>
                  </div>
                  <label htmlFor="demo-opacity">
                    Background opacity <output>{opacity}%</output>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      id="demo-opacity"
                      value={opacity}
                      onChange={(e) => setOpacity(Number(e.target.value))}
                    />
                  </label>
                  <label htmlFor="demo-font-size">
                    Lyric size <output>{fontSize}px</output>
                    <input
                      type="range"
                      min="16"
                      max="32"
                      id="demo-font-size"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                    />
                  </label>
                  <label htmlFor="demo-timing">
                    Lyric timing <output>{offset.toFixed(1)}s</output>
                    <input
                      type="range"
                      min="-2"
                      max="2"
                      step="0.1"
                      id="demo-timing"
                      value={offset}
                      onChange={(e) => setOffset(Number(e.target.value))}
                    />
                  </label>
                </div>
              ) : (
                <button
                  ref={bodyButton}
                  className="demo-lyric-body"
                  aria-label={chrome ? "Hide lyric controls" : "Show lyric controls"}
                  aria-expanded={chrome}
                  onClick={toggleChrome}
                  style={{ fontSize }}
                >
                  <span className="demo-current-line" data-cue={cueIndex}>
                    {line?.text ?? "♪ Small Hours"}
                  </span>
                  <span className="demo-next-line">
                    {next?.text ?? "End of demo · replay anytime"}
                  </span>
                </button>
              )}
              <footer
                className="demo-transport"
                style={{ visibility: chrome ? "visible" : "hidden" }}
              >
                <button
                  className="demo-resize resize-left"
                  data-resize="left"
                  aria-label="Resize lyrics from left. Use arrow keys."
                  onKeyDown={(e) => keys(e, "left")}
                >
                  <DemoIcon name="resize-left" />
                </button>
                <button aria-label="Previous track unavailable in one-track demo" disabled>
                  <DemoIcon name="previous" />
                </button>
                <button
                  className="demo-play"
                  aria-label={
                    playing
                      ? "Pause demo music"
                      : playback === "error"
                        ? "Retry demo music"
                        : playback === "ended"
                          ? "Replay demo music"
                          : "Play demo music"
                  }
                  onClick={() => {
                    if (playing || playback === "loading") {
                      pause();
                    } else void play();
                  }}
                >
                  <span className="demo-play-disc">
                    <DemoIcon name={playing ? "pause" : "play"} />
                  </span>
                  <span className="demo-play-label">{playing ? "Pause" : "Play"}</span>
                </button>
                <button aria-label="Next track unavailable in one-track demo" disabled>
                  <DemoIcon name="next" />
                </button>
                <label className="demo-timeline" data-no-move>
                  <span className="sr-only">Seek demo music</span>
                  <input
                    type="range"
                    style={timelineStyle}
                    min="0"
                    max={duration}
                    step="0.01"
                    value={preview ?? time}
                    disabled={
                      playback === "ready" || playback === "loading" || playback === "error"
                    }
                    aria-valuetext={`${preview !== null ? "Seek to " : ""}${clock(preview ?? time)} of ${clock(duration)}`}
                    onPointerDown={() => {
                      seekActive.current = true;
                    }}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (seekActive.current) setPreview(value);
                      else seek(value);
                    }}
                    onPointerUp={(e) => {
                      seek(Number(e.currentTarget.value));
                    }}
                    onPointerCancel={() => {
                      seekActive.current = false;
                      setPreview(null);
                    }}
                    onLostPointerCapture={() => {
                      seekActive.current = false;
                      setPreview(null);
                    }}
                    onBlur={() => {
                      seekActive.current = false;
                      setPreview(null);
                    }}
                  />
                  <span aria-hidden="true">
                    {preview !== null
                      ? `Seek to ${clock(preview)}`
                      : `${clock(time)} / ${clock(duration)}`}
                  </span>
                </label>
                <button
                  className="demo-resize resize-right"
                  data-resize="right"
                  aria-label="Resize lyrics from right. Use arrow keys."
                  onKeyDown={(e) => keys(e, "right")}
                >
                  <DemoIcon name="resize-right" />
                </button>
              </footer>
            </>
          )}
        </section>
      )}
      {open && (
        <p className="demo-status sr-only" role="status">
          {playback === "error"
            ? "Audio could not play. Use Retry demo music, or close the demo."
            : playback === "loading"
              ? "Loading demo music"
              : playback === "buffering"
                ? "Buffering demo music"
                : playback === "ended"
                  ? "Demo finished. Replay is available."
                  : ""}
        </p>
      )}
      {open && (playback === "error" || playback === "loading" || playback === "buffering") && (
        <div className="demo-media-notice" role="status">
          {playback === "error" ? (
            <>
              <span>Music couldn’t play.</span>
              <button onClick={() => void play()}>Retry demo music</button>
              <button onClick={close}>Close demo</button>
            </>
          ) : playback === "loading" ? (
            "Loading music…"
          ) : (
            "Buffering music…"
          )}
        </div>
      )}
      <p id="demo-site-boundary" className="sr-only">
        Demo music and floating lyrics work within this website. Close pauses the music. Reloading
        or leaving the site ends this session.
      </p>
    </Context.Provider>
  );
}
