"use client";

import { useEffect, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import { home } from "@/content/home";
import { AppIcon } from "./SiteChrome";

const copy = home.scene;
function toolbarSpace(element: HTMLDivElement | null) {
  return Math.max(82, (element?.getBoundingClientRect().height ?? 0) + 38);
}
export function ProductScene() {
  const [context, setContext] = useState(0);
  const [dark, setDark] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const window = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const offset = useRef({ x: 0, y: 0 });
  const drag = useRef<{
    pointer: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
  } | null>(null);
  const animation = useRef<number | null>(null);
  useEffect(
    () => () => {
      if (animation.current !== null) cancelAnimationFrame(animation.current);
    },
    [],
  );
  function paint(x: number, y: number) {
    offset.current = { x, y };
    if (window.current) window.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  function bounds(x: number, y: number) {
    const frame = stage.current?.getBoundingClientRect();
    const panel = window.current?.getBoundingClientRect();
    if (!frame || !panel) return { x, y };
    const left = panel.left - frame.left - offset.current.x;
    const top = panel.top - frame.top - offset.current.y;
    return {
      x: Math.max(12 - left, Math.min(frame.width - panel.width - 12 - left, x)),
      y: Math.max(
        20 - top,
        Math.min(frame.height - panel.height - toolbarSpace(controls.current) - top, y),
      ),
    };
  }
  function stop() {
    if (animation.current !== null) cancelAnimationFrame(animation.current);
    animation.current = null;
  }
  useEffect(() => {
    const reclamp = () => {
      stop();
      drag.current = null;
      if (stage.current && window.current) {
        // Make room for enlarged text before clamping the window above the toolbar.
        stage.current.style.minHeight = `${Math.ceil(window.current.getBoundingClientRect().height + 20 + toolbarSpace(controls.current))}px`;
      }
      const next = bounds(offset.current.x, offset.current.y);
      paint(next.x, next.y);
    };
    const observer = new ResizeObserver(reclamp);
    if (stage.current) observer.observe(stage.current);
    if (window.current) observer.observe(window.current);
    if (controls.current) observer.observe(controls.current);
    return () => observer.disconnect();
  }, []);
  function shift(x: number, y: number) {
    stop();
    const next = bounds(offset.current.x + x, offset.current.y + y);
    paint(next.x, next.y);
  }
  function reset() {
    if (animation.current !== null) return;
    const target = bounds(0, 0);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      paint(target.x, target.y);
      return;
    }
    let vx = 0,
      vy = 0,
      last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;
      // Critical damping; retarget from the currently presented position.
      const { x, y } = offset.current;
      vx += ((target.x - x) * 225 - 30 * vx) * dt;
      vy += ((target.y - y) * 225 - 30 * vy) * dt;
      paint(x + vx * dt, y + vy * dt);
      if (
        Math.abs(offset.current.x - target.x) +
          Math.abs(offset.current.y - target.y) +
          Math.abs(vx) +
          Math.abs(vy) <
        0.12
      ) {
        paint(target.x, target.y);
        animation.current = null;
      } else animation.current = requestAnimationFrame(frame);
    };
    animation.current = requestAnimationFrame(frame);
  }
  function down(e: PointerEvent<HTMLButtonElement>) {
    if (e.button !== 0) return;
    stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      pointer: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      startX: offset.current.x,
      startY: offset.current.y,
    };
  }
  function move(e: PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d || d.pointer !== e.pointerId) return;
    const p = bounds(d.startX + e.clientX - d.x, d.startY + e.clientY - d.y);
    paint(p.x, p.y);
  }
  function release(e: PointerEvent<HTMLButtonElement>) {
    if (drag.current?.pointer === e.pointerId) drag.current = null;
  }
  function keys(e: KeyboardEvent<HTMLButtonElement>) {
    const delta: Record<string, [number, number]> = {
      ArrowLeft: [-20, 0],
      ArrowRight: [20, 0],
      ArrowUp: [0, -20],
      ArrowDown: [0, 20],
    };
    if (e.key === "Home") {
      e.preventDefault();
      reset();
      return;
    }
    const d = delta[e.key];
    if (!d) return;
    e.preventDefault();
    shift(d[0], d[1]);
  }
  const current = copy.context[context];
  return (
    <div id="experience" className="experience-anchor">
      <div ref={stage} className={`product-stage context-${context}`}>
        <div className="stage-grain" aria-hidden="true" />
        <div className="scene-note scene-note-left" aria-hidden="true">
          <span className="note-line" />
          {copy.leftNote[0]}
          <br />
          <strong>{copy.leftNote[1]}</strong>
        </div>
        <div className="scene-note scene-note-right" aria-hidden="true">
          <span className="note-line" />
          {copy.rightNote[0]}
          <br />
          <strong>{copy.rightNote[1]}</strong>
        </div>
        <div className="phone" aria-label={copy.label} role="img">
          <div className="phone-hardware">
            <div className="phone-camera" />
            <div className="phone-status">
              <span>9:41</span>
              <span>▴ ▴ ▰</span>
            </div>
            <div className="phone-app" key={context}>
              <div className="phone-app-bar">
                <span>{copy.appLabels[context]}</span>
                <span aria-hidden="true">◌</span>
              </div>
              <div className="cover-art" aria-hidden="true">
                <div className="cover-sun" />
                <div className="cover-hill hill-back" />
                <div className="cover-hill hill-front" />
              </div>
              <p className="phone-kicker">{current.eyebrow}</p>
              <p className="phone-title">{current.title}</p>
              <p className="phone-description">{current.text}</p>
              {context === 2 ? (
                <div className="phone-playback" aria-hidden="true">
                  <div className="playback-track">
                    <span />
                  </div>
                  <div className="playback-controls">
                    ↶ <span>Ⅱ</span> ↷
                  </div>
                </div>
              ) : (
                <div className="phone-text-lines" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
            <div className="phone-home" />
          </div>
        </div>
        <div className={`floating-window ${dark ? "window-dark" : "window-light"}`} ref={window}>
          <button
            className="window-drag"
            aria-label={copy.move}
            aria-describedby="window-instructions"
            onPointerDown={down}
            onPointerMove={move}
            onPointerUp={release}
            onPointerCancel={release}
            onLostPointerCapture={() => {
              drag.current = null;
            }}
            onKeyDown={keys}
          >
            <span className="window-brand">
              <AppIcon size={18} />
              {copy.windowTitle}
            </span>
            <span className="drag-grip" aria-hidden="true">
              ⠿
            </span>
          </button>
          <div className="window-lyrics">
            <p>{copy.lines[0]}</p>
            <strong>
              {copy.lines[1]}
              <br />
              {copy.lines[2]}
            </strong>
          </div>
          <div className="window-footer">
            <span className="audio-bars" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>{copy.track}</span>
            <span className="window-dot" />
          </div>
        </div>
        <div className="scene-controls" ref={controls}>
          <div className="context-tabs" role="group" aria-label={copy.contextLabel}>
            {copy.contexts.map((name, i) => (
              <button key={name} aria-pressed={i === context} onClick={() => setContext(i)}>
                {name}
              </button>
            ))}
          </div>
          <span className="controls-divider" />
          <div className="appearance-controls" role="group" aria-label={copy.themes}>
            <button
              onClick={() => setDark(false)}
              aria-pressed={!dark}
              aria-label={copy.light}
              title={copy.light}
            >
              <span className="swatch-light" />
            </button>
            <button
              onClick={() => setDark(true)}
              aria-pressed={dark}
              aria-label={copy.dark}
              title={copy.dark}
            >
              <span className="swatch-dark" />
            </button>
          </div>
          <button
            className="reset-window"
            onClick={reset}
            aria-label={copy.reset}
            title={copy.reset}
          >
            ↺
          </button>
        </div>
      </div>
      <div className="scene-caption">
        <p>{copy.hint}</p>
        <span>{copy.notice}</span>
        <details className="movement-options">
          <summary>{copy.tapSummary}</summary>
          <div className="movement-pad" role="group" aria-label={copy.tapLabel}>
            {copy.directions.map(({ label, symbol, x, y }) => (
              <button key={label} aria-label={label} onClick={() => shift(x, y)}>
                <span aria-hidden="true">{symbol}</span>
              </button>
            ))}
          </div>
        </details>
        <p className="sr-only" id="window-instructions">
          {copy.help}
        </p>
      </div>
    </div>
  );
}
