// Render src/video.html frame by frame (window.render(t)) to JPEG frames for ffmpeg.
// Usage: node src/render_video.js <framesDir> [fps]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [, , dir, fpsArg] = process.argv;
  const fps = +fpsArg || 30;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.resolve(__dirname, 'video.html'));
  await p.waitForTimeout(500);
  const dur = await p.evaluate(() => window.DURATION);
  const n = Math.round(dur * fps);
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => window.render(t), i / fps);
    await p.screenshot({ path: `${dir}/f${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
  }
  await b.close();
  console.log(n, 'frames');
})();
