// Public static-output seam. Run after build, optionally against a local static server.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

const canonicalOrigin = new URL(process.env.SITE_ORIGIN || "https://floating-lyrics.web.app")
  .origin;
const previewOrigin = process.argv[2];
const pages = [
  ["/", "Floating Lyrics - Keep lyrics visible while using another app.", /synchronized lyrics/i],
  ["/setup/", "Setup & troubleshooting - Floating Lyrics", /notification access/i],
  ["/lrc/", "LRC import guide - Floating Lyrics", /synchronized LRC files/i],
  ["/privacy/", "Privacy Policy - Floating Lyrics", /privacy policy/i],
  ["/support/", "Support and account deletion - Floating Lyrics", /deletion by email/i],
];
async function get(path) {
  if (previewOrigin) {
    const response = await fetch(new URL(path, previewOrigin));
    assert.equal(response.status, 200, path);
    return Buffer.from(await response.arrayBuffer());
  }
  return readFile(`out${path.endsWith("/") ? `${path}index.html` : path}`);
}
for (const [path, title, description] of pages) {
  const { document } = new JSDOM((await get(path)).toString()).window;
  const meta = (key) =>
    document.querySelector(`meta[property="${key}"],meta[name="${key}"]`)?.content;
  assert.equal(document.title, title, path);
  assert.match(meta("description"), description, path);
  assert.equal(
    document.querySelector('link[rel="canonical"]')?.href,
    `${canonicalOrigin}${path}`,
    path,
  );
  assert.equal(meta("og:url"), `${canonicalOrigin}${path}`, path);
  assert.equal(meta("og:title"), title, path);
  assert.equal(meta("og:description"), meta("description"), path);
  assert.equal(meta("twitter:title"), title, path);
  assert.equal(meta("twitter:card"), "summary_large_image", path);
  assert.equal(meta("og:image"), `${canonicalOrigin}/og.png`, path);
  assert.equal(meta("twitter:image"), `${canonicalOrigin}/og.png`, path);
  assert.match(meta("robots"), /index, follow/, path);
  assert.ok(document.querySelector("main h1"), path);
  const links = [...document.querySelectorAll("footer a")].map((link) =>
    new URL(link.href, canonicalOrigin).pathname.replace(/\/$/, ""),
  );
  for (const [route] of pages)
    assert.ok(links.includes(route.replace(/\/$/, "")), `${path} links ${route}`);
  if (path === "/") {
    const data = JSON.parse(
      document.querySelector('script[type="application/ld+json"]').textContent,
    );
    assert.equal(data.name, "Floating Lyrics");
    assert.equal(data.operatingSystem, "Android");
    assert.equal(
      data.downloadUrl,
      "https://play.google.com/store/apps/details?id=com.floating.lyrics",
    );
    for (const unsupported of [
      "offers",
      "aggregateRating",
      "review",
      "softwareVersion",
      "availability",
    ])
      assert.equal(data[unsupported], undefined);
  }
}
const sitemap = new JSDOM((await get("/sitemap.xml")).toString(), { contentType: "text/xml" });
assert.deepEqual(
  [...sitemap.window.document.querySelectorAll("loc")].map((loc) => loc.textContent).sort(),
  pages.map(([path]) => `${canonicalOrigin}${path}`).sort(),
);
assert.match(
  (await get("/robots.txt")).toString(),
  new RegExp(`Sitemap: ${canonicalOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap.xml`),
);
const image = await get("/og.png");
assert.equal(image.subarray(1, 4).toString(), "PNG");
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
console.log(
  `Verified all five pages, literal metadata, structured data, social image, sitemap and robots (${previewOrigin || "out/"}).`,
);
