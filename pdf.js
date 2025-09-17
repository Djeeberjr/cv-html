import puppeteer from "puppeteer-core";
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const filePath = `file:${path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist/index.html')}`;
const chromiumPath = execSync('which chromium').toString().trim();

const browser = await puppeteer.launch({
  executablePath: chromiumPath,
  args: [
    '--disable-web-security',
    '--allow-file-access-from-files',
    '--disable-site-isolation-trials'
  ]
});
const page = await browser.newPage();
await page.setBypassCSP(true);
await page.goto(filePath, {
  waitUntil: 'networkidle2',
});
// Saves the PDF to hn.pdf.
await page.pdf({
  path: 'out.pdf',
  format: 'A4',
});

await browser.close();
