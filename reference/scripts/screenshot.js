const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://1kimagency.github.io/kim-ai-school/';
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'screenshots';

const viewports = [
  { name: 'desktop-full', width: 1440, height: 1200, fullPage: true },
  { name: 'desktop-top',  width: 1440, height: 1200, fullPage: false },
  { name: 'mobile-full',  width: 390,  height: 844,  fullPage: true },
  { name: 'mobile-top',   width: 390,  height: 844,  fullPage: false },
];

// Scroll through the entire page so IntersectionObserver fires naturally
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const totalHeight = document.documentElement.scrollHeight;
    const step = 300;
    let pos = 0;
    while (pos < totalHeight) {
      window.scrollTo(0, pos);
      await new Promise(r => setTimeout(r, 60));
      pos += step;
    }
    // Scroll back to top
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 300));
  });
}

// Force-reveal every scroll-animated element regardless of scroll position
async function revealAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  });
  await page.waitForTimeout(500);
}

async function waitForPageReady(page) {
  await page.goto(SITE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

  try {
    await page.waitForLoadState('networkidle', { timeout: 20000 });
  } catch (err) {
    console.warn('networkidle timeout, continuing:', err.message);
  }

  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });

  await page.waitForTimeout(800);
}

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (['error', 'warning'].includes(msg.type())) {
      console.log(`[browser:${msg.type()}] ${msg.text()}`);
    }
  });

  for (const vp of viewports) {
    console.log(`Capturing ${vp.name} (${vp.width}×${vp.height}, fullPage=${vp.fullPage})...`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await waitForPageReady(page);

    if (vp.fullPage) {
      // 1. Natural scroll triggers IntersectionObserver on any real elements
      await scrollThrough(page);
      // 2. Force-reveal anything that still hasn't been triggered
      await revealAll(page);
    }

    const outPath = path.join(OUTPUT_DIR, `${vp.name}.png`);
    await page.screenshot({ path: outPath, fullPage: vp.fullPage });
    console.log(`  → saved ${outPath}`);
  }

  await browser.close();
  console.log('Done.');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
