import { createRequire } from "node:module";
import { existsSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const usage = "usage: node snapshot.mjs <url or local-path> <out.html> [pass label] [--dark | --light] [--width=1440] [--height=900]";
const args = process.argv.slice(2);
const flag = (name) => args.find((arg) => arg.startsWith(`--${name}=`))?.split("=")[1];
const [rawUrl, out, label] = args.filter((arg) => !arg.startsWith("--"));
const width = flag("width") ?? "1440";
const height = flag("height") ?? "900";
const scheme = args.includes("--dark") ? "dark" : args.includes("--light") ? "light" : "no-preference";

if (!rawUrl || !out) {
  console.error(usage);
  process.exit(1);
}

async function browserKit() {
  for (const name of ["playwright", "playwright-core"]) {
    try {
      return await import(name);
    } catch {}
    try {
      return createRequire(join(process.cwd(), "package.json"))(name);
    } catch {}
  }
  console.error("Playwright is not installed. Run `npm install -D playwright`.");
  process.exit(1);
}

const chrome = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome"
].find((path) => path && existsSync(path));

const { chromium } = await browserKit();
const browser = await chromium.launch(chrome ? { executablePath: chrome } : {});

try {
  const page = await browser.newPage({
    viewport: { width: Number(width), height: Number(height) },
    colorScheme: scheme
  });

  const url = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") || rawUrl.startsWith("file://")
    ? rawUrl
    : `file:///${resolve(rawUrl).replace(/\\/g, "/")}`;

  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);

  const html = await page.evaluate(async ([label, scheme]) => {
    const LIMIT = 3_000_000;
    const absolute = (value, base = location.href) => {
      try {
        return new URL(value, base).href;
      } catch {
        return value;
      }
    };
    const inlined = new Map();
    const inline = async (href) => {
      if (!href || href.startsWith("data:")) return href;
      if (!inlined.has(href)) {
        inlined.set(
          href,
          fetch(href)
            .then((r) => r.blob())
            .then((b) => (b.size > LIMIT ? href : new Promise((res) => {
              const r = new FileReader();
              r.onload = () => res(r.result);
              r.readAsDataURL(b);
            })))
            .catch(() => href)
        );
      }
      return inlined.get(href);
    };

    const clone = document.documentElement.cloneNode(true);
    for (const img of clone.querySelectorAll("img[src]")) {
      img.setAttribute("src", await inline(absolute(img.getAttribute("src"))));
    }
    const meta = document.createElement("meta");
    meta.name = "generator";
    meta.content = "WebRefinery Snapshot Engine";
    clone.querySelector("head")?.appendChild(meta);

    return "<!doctype html>\n" + clone.outerHTML;
  }, [label, scheme]);

  writeFileSync(resolve(out), html, "utf8");

  const screenshotPath = resolve(out).replace(/\.html$/i, ".live.png");
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`[WebRefinery] Snapshot saved to ${resolve(out)}`);
  console.log(`[WebRefinery] Full-resolution capture saved to ${screenshotPath}`);
} finally {
  await browser.close();
}
