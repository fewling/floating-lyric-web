"use client";

import { useState } from "react";
import { home } from "@/content/home";

const copy = home.scene;
export function ProductScene() {
  const [context, setContext] = useState(0);
  const current = copy.context[context];
  return (
    <div id="experience" className="experience-anchor">
      <div className="scene-controls">
        <div className="context-tabs" role="group" aria-label={copy.contextLabel}>
          {copy.contexts.map((name, i) => (
            <button key={name} aria-pressed={i === context} onClick={() => setContext(i)}>
              {name}
            </button>
          ))}
        </div>
      </div>
      <div className={`product-stage context-${context}`}>
        <div className="stage-grain" aria-hidden="true" />
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
              {context !== 2 && (
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
      </div>
      <p className="scene-provenance">Android illustration</p>
    </div>
  );
}
