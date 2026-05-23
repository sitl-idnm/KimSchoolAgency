const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || 'https://1kimagency.github.io/kim-ai-school/';
const OUTPUT_DIR = process.env.OUTPUT_DIR || 'screenshots';

const viewports = [
  {
    name: 'desktop-full',
    width: 1440,
    height: 1200,
    fullPage: true,
  },
  {
    name: 'desktop-top',
    width: 1440,
    height: 1200,
    fullPage: false,
  },
  {
    name: 'mobile-full',
    width: 390,
    height: 844,
    fullPage: true,
  },
  {
    name: 'mobile-top',
    width: 390,
    height: 844,
    fullPage: false,
  },
];

async function waitForPageReady(page) {
  await page.goto(SITE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

  try {
    await page.waitForLoadState('networkidle', { timeout: 20000 });
  } catch (error) {
    console.warn('networkidle timeout, continuing with screenshot:', error.message);
  }

  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });

  await page.waitForTimeout(800);
}

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      console.log(`[browser:${message.type()}] ${message.text()}`);
    }
  });

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await waitForPageReady(page);

    const outputPath = path.join(OUTPUT_DIR, `${viewport.name}.png`);
    await page.screenshot({ path: outputPath, fullPage: viewport.fullPage });
    console.log(`Saved ${outputPath}`);
  }

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
