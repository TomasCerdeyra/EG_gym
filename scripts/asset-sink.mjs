// Local asset importer. The Instagram tab hands us a list of signed CDN URLs
// through the URL fragment (never leaves the machine); Node then downloads
// them server-side, so no browser CSP or CORS rule is involved.
import { createServer } from "node:http";
import { writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const OUT_DIR = resolve(process.cwd(), "src/assets");
const PORT = 7788;

const PAGE = `<!doctype html>
<meta charset="utf-8"><title>EG asset import</title>
<body style="font:14px system-ui;background:#111;color:#eee;padding:24px">
<pre id="out">reading fragment...</pre>
<script>
const out = document.getElementById('out');
(async () => {
  const raw = decodeURIComponent(location.hash.slice(1));
  if (!raw) { out.textContent = 'NO_PAYLOAD'; return; }
  out.textContent = 'sending list to node...';
  const res = await fetch('/fetch', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: raw,
  });
  out.textContent = await res.text();
})();
</script>
`;

async function download(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
      referer: "https://www.instagram.com/",
      accept: "image/avif,image/webp,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return Buffer.from(await res.arrayBuffer());
}

createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && url.pathname === "/collect") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" }).end(PAGE);
    return;
  }

  if (req.method === "POST" && url.pathname === "/fetch") {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    let items;
    try {
      items = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      res.writeHead(400).end("bad json");
      return;
    }

    await mkdir(OUT_DIR, { recursive: true });
    const report = [];
    const manifest = [];
    let n = 0;
    for (const item of items) {
      n += 1;
      const name = `eg-${String(n).padStart(2, "0")}.jpg`;
      try {
        const buf = await download(item.src);
        await writeFile(resolve(OUT_DIR, name), buf);
        report.push(`${name}  ${item.w}x${item.h}  ${buf.length}B  OK`);
        manifest.push({ file: name, w: item.w, h: item.h, alt: item.alt });
      } catch (err) {
        report.push(`${name}  FAILED: ${err.message}`);
      }
    }
    await writeFile(
      resolve(OUT_DIR, "manifest.json"),
      JSON.stringify(manifest, null, 2),
    );
    const text = report.join("\n");
    console.log(text);
    res.writeHead(200, { "content-type": "text/plain; charset=utf-8" }).end(text);
    return;
  }

  res.writeHead(404).end("nope");
}).listen(PORT, () =>
  console.log(`asset importer on ${PORT} -> ${OUT_DIR}`),
);
