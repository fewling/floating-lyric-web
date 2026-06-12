export const THEME_STORAGE_KEY = "theme";

/** Pre-hydration bootstrap: sets [data-theme] on <html> before first paint.
 *  Injected as an inline <script> in layout.tsx; ThemeToggle reads/writes the
 *  same storage key so persistence stays in sync. */
export const themeInit = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})();`;
