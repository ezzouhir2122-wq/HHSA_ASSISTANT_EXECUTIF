// Render an HTML file to PDF (CSS page size) and optionally screenshot each section.slide
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [, , html, outPdf, shotsDir] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: shotsDir ? 2 : 1 });
  await p.goto('file://' + path.resolve(html));
  await p.waitForTimeout(400);
  await p.pdf({ path: outPdf, preferCSSPageSize: true, printBackground: true });
  if (shotsDir) {
    const s = await p.$$('section.slide');
    for (let i = 0; i < s.length; i++) {
      await s[i].screenshot({ path: `${shotsDir}/s${String(i + 1).padStart(2, '0')}.png` });
    }
  }
  await b.close();
})();
