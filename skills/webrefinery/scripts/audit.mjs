import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { createRequire } from "node:module";

const usage = "usage: node audit.mjs <url or html-file-path> [--json] [--dark | --light]";
const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
const isJson = args.includes("--json");
const isDark = args.includes("--dark");
const isLight = args.includes("--light");

if (!target) {
  console.error(usage);
  process.exit(1);
}

async function getBrowser() {
  for (const name of ["playwright", "playwright-core"]) {
    try {
      return await import(name);
    } catch {}
    try {
      return createRequire(join(process.cwd(), "package.json"))(name);
    } catch {}
  }
  console.error("Playwright is not installed. Please run `npm install -D playwright` first.");
  process.exit(1);
}

const chrome = [
  process.env.CHROME_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome"
].find((p) => p && existsSync(p));

const { chromium } = await getBrowser();
const browser = await chromium.launch(chrome ? { executablePath: chrome } : {});

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    colorScheme: isDark ? "dark" : isLight ? "light" : "no-preference"
  });

  const url = target.startsWith("http://") || target.startsWith("https://") || target.startsWith("file://")
    ? target
    : `file:///${resolve(target).replace(/\\/g, "/")}`;

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const report = await page.evaluate(() => {
    const findings = [];
    let penalties = 0;

    // Helper: inspect computed styles
    const all = Array.from(document.querySelectorAll("body *"));

    // 1. Audit: Gradient Text
    all.forEach((el) => {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundImage;
      const textFill = style.webkitTextFillColor;
      if (textFill === "transparent" || style.backgroundClip === "text" || (bg && bg.includes("gradient") && textFill === "rgba(0, 0, 0, 0)")) {
        findings.push({
          category: "Surfaces & Color",
          sign: "Gradient Text Clip",
          tag: el.tagName.toLowerCase(),
          snippet: el.textContent?.trim().slice(0, 30) || "",
          fix: "Replace with solid primary text ramp for crisp readability."
        });
        penalties += 8;
      }
    });

    // 2. Audit: Colored Glows & Shadow Blobs
    all.forEach((el) => {
      const style = window.getComputedStyle(el);
      const shadow = style.boxShadow;
      if (shadow && shadow !== "none" && /rgba?\(\s*(139|168|59|236|14|99|249)\s*,/i.test(shadow)) {
        findings.push({
          category: "Surfaces & Color",
          sign: "Colored Box Glow",
          tag: el.tagName.toLowerCase(),
          snippet: el.className ? `.${el.className.split(" ")[0]}` : el.tagName.toLowerCase(),
          fix: "Remove glow. Use quiet 1px hairlines at 8% opacity and surface elevation."
        });
        penalties += 10;
      }
    });

    // 3. Audit: Emoji icons in buttons or navigation
    const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]/;
    const interactive = Array.from(document.querySelectorAll("a, button, nav *"));
    interactive.forEach((el) => {
      if (emojiRegex.test(el.textContent || "") && !el.querySelector("svg")) {
        findings.push({
          category: "Icons & Badges",
          sign: "Emoji as UI Navigation/Action Icon",
          tag: el.tagName.toLowerCase(),
          snippet: el.textContent?.trim().slice(0, 25) || "",
          fix: "Replace decorative emojis with consistent monochromatic SVG line icons."
        });
        penalties += 7;
      }
    });

    // 4. Audit: Infinite motion loops / 3D carousel
    all.forEach((el) => {
      const style = window.getComputedStyle(el);
      const anim = style.animation;
      const transform = style.transform;
      if (anim && anim.includes("infinite") && (anim.includes("rotate") || anim.includes("pulse") || anim.includes("bounce"))) {
        findings.push({
          category: "Motion & Performance",
          sign: "Unbounded Infinite Animation Loop",
          tag: el.tagName.toLowerCase(),
          snippet: el.className ? `.${el.className.split(" ")[0]}` : el.tagName.toLowerCase(),
          fix: "Remove continuous infinite spin/pulse. Restrict motion to user-triggered transitions."
        });
        penalties += 12;
      }
    });

    // 5. Audit: Excessive font weight 800/900
    all.forEach((el) => {
      const style = window.getComputedStyle(el);
      const weight = parseInt(style.fontWeight, 10);
      if (weight >= 800) {
        findings.push({
          category: "Typography",
          sign: "Heavyweight Type (800-900)",
          tag: el.tagName.toLowerCase(),
          snippet: el.textContent?.trim().slice(0, 30) || "",
          fix: "Reduce font-weight to 500 or 600. Achieve visual hierarchy through scale rather than thickness."
        });
        penalties += 6;
      }
    });

    // Deduplicate findings by (category + sign)
    const unique = [];
    const seen = new Set();
    for (const f of findings) {
      const key = `${f.category}:${f.sign}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(f);
      }
    }

    const score = Math.max(0, 100 - penalties);
    return {
      url: window.location.href,
      refineryScore: score,
      status: score >= 90 ? "Pristine Craft" : score >= 70 ? "Minor Slop Detected" : "Heavy Slop / Needs Refinement",
      findingsCount: unique.length,
      findings: unique
    };
  });

  if (isJson) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log("\n=======================================================");
    console.log("             WEBREFINERY AUDIT REPORT                 ");
    console.log("=======================================================");
    console.log(`Target:         ${report.url}`);
    console.log(`Refinery Score: ${report.refineryScore} / 100 [${report.status}]`);
    console.log(`Issues Found:   ${report.findingsCount}\n`);

    if (report.findings.length === 0) {
      console.log("✓ No slop detected. Interface demonstrates deliberate craft.");
    } else {
      report.findings.forEach((item, i) => {
        console.log(`[${i + 1}] ${item.category} -> ${item.sign}`);
        if (item.snippet) console.log(`    Target:  "${item.snippet}" (<${item.tag}>)`);
        console.log(`    Fix:     ${item.fix}\n`);
      });
    }
    console.log("=======================================================\n");
  }
} finally {
  await browser.close();
}
